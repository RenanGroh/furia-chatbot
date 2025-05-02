import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// Importe seu serviço para buscar dados da FURIA (RAG)
import { getJogadoresAtuais, getProximoJogo } from "../../core/furiaService";

// INTEFACES
interface PandaScoreMatch {
  slug(arg0: string, slug: any): unknown;
  id: number;
  status: string;
  opponents: any[]; // Simplificado por enquanto
  league: { id: number; name: string; image_url: string | null };
  serie: { id: number; full_name: string };
  tournament: { id: number; name: string };
  begin_at: string;
  // Adicione outros campos que você usa
}

interface TeamInfo {
  id: number;
  name: string;
  imageUrl: string | null;
  // Adicione slug se precisar/quiser
}

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json()); // Essencial para receber o corpo da requisição POST

// Configuração do Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Variável de ambiente GEMINI_API_KEY não definida!");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Ou outro modelo Gemini

const generationConfig = {
  temperature: 0.9, // Controla a criatividade (0=determinístico, 1=máximo)
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048, // Limite de tokens na resposta
};

const safetySettings = [
  // Configurações de segurança (ajuste conforme necessidade)
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// ==================================================
// ====>             PANDASCORE                 <====
// ==================================================
const PANDASCORE_KEY = process.env.PANDASCORE_API_KEY;
const FURIA_TEAM_ID = process.env.FURIA_CS2_TEAM_ID; // Usará o valor do .env (124530)
const PANDASCORE_BASE_URL = "https://api.pandascore.co";

// Opcional: adicionar verificação se as variáveis foram carregadas
if (!PANDASCORE_KEY || !FURIA_TEAM_ID) {
  console.warn(
    "AVISO: PandaScore API Key ou FURIA Team ID não definidos no .env. A rota de próximo jogo pode falhar."
  );
  // Você pode decidir se quer lançar um erro ou só avisar
  // throw new Error("Configuração PandaScore incompleta no .env");
}
// ==================================================
// ====> FIM DO BLOCO PANDASCORE                <====
// ==================================================

app.post(
  "/api/chat/send-message",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let contextInfo = "";
      let rosterContexto = "";
      const userMessage = req.body.message;

      if (!userMessage) {
        // Adicione 'return;' após enviar a resposta em blocos 'if' que terminam a execução
        res.status(400).json({ error: "Nenhuma mensagem fornecida." });
        return;
      }
      console.log("Recebido do usuário:", userMessage);
      console.log("Mensagem Lower:", `"${userMessage.toLowerCase()}"`); // Veja se tem espaços estranhos
      console.log(
        'lowerUserMessage.includes("time atual"):',
        userMessage.toLowerCase().includes("time atual")
      );

      // --- BLOCO PARA ADICIONAR CONTEXTO (RAG) ---
      if (userMessage.toLowerCase().includes("próximo jogo")) {
        console.log("Mensagem inclui 'próximo jogo', buscando contexto RAG...");
        try {
          const jogo = await getProximoJogo();
          if (jogo) {
            contextInfo = ` Contexto (Próximo Jogo): A FURIA joga contra ${
              jogo.adversario
            } em ${new Date(jogo.data).toLocaleDateString("pt-BR")} (${
              jogo.campeonato
            }).`;
            console.log("Contexto RAG Jogo adicionado:", contextInfo);
          } else {
            console.log("Contexto RAG: Próximo jogo não encontrado.");
          }
        } catch (e) {
          console.error("Erro buscando contexto RAG (Jogo):", e);
        }
      }

      if (
        userMessage.toLowerCase().includes("time atual") ||
        userMessage.toLowerCase().includes("roster") ||
        userMessage.toLowerCase().includes("jogadores atuais") ||
        userMessage.toLowerCase().includes("escalação")
      ) {
        console.log("*** ENTROU NO IF DO ROSTER RAG! ***");
        console.log("Mensagem inclui termo sobre escalação, buscando RAG...");
        try {
          const jogadoresInfo = await getJogadoresAtuais();
          if (jogadoresInfo && jogadoresInfo.roster) {
            // Adiciona um espaço antes e formata a lista
            rosterContexto = ` Contexto (Escalação Atual): ${jogadoresInfo.roster.replace(
              /,/g,
              ", "
            )}.`;
            console.log("Contexto RAG Roster adicionado:", rosterContexto);
          } else {
            console.log("Contexto RAG: Roster atual não encontrado.");
          }
        } catch (e) {
          console.error("Erro buscando contexto RAG (Roster):", e);
        }
      }
      console.log("--- FIM VERIFICAÇÃO ROSTER RAG ---");
      const combinedContext = `${contextInfo}${rosterContexto}`;
      // --- FIM DO BLOCO PARA ADICIONAR CONTEXTO ---

      const chatHistory = [
        {
          // Define o papel e o contexto inicial do bot
          role: "user",
          parts: [
            {
              text: `Você é um chatbot assistente especializado na equipe de e-sports FURIA (CS2).
              Seja simpático, informativo e fã! Responda perguntas sobre o time,lembrando que o time atual tem o Fallen,
              Yuurih, Yekindar, KSCERATO e Molodoy, alem disso reposta sobre os
              próximos jogos, história, conquistas e notícias. **Se um contexto sobre o estado atual 
              (como escalação ou próximo jogo) for fornecido adiante nesta instrução ou nas mensagens seguintes,
              priorize essa informação para sua resposta.** Se não houver contexto, use seu conhecimento geral,
              mas avise que a informação pode não ser a mais recente.${combinedContext}`,
            },
          ],
        },
        {
          // Define a primeira resposta "modelo" do bot
          role: "model",
          parts: [
            {
              text: "Salve, torcedor da pantera! Como posso te ajudar hoje a saber mais sobre a FURIA?",
            },
          ],
        },
        // ---- AQUI pode adicionar o histórico da conversa atual se quiser manter contexto ----
        // { role: "user", parts: [{ text: "Mensagem anterior do usuario" }] },
        // { role: "model", parts: [{ text: "Resposta anterior do bot" }] },
        {
          // A mensagem atual do usuário
          role: "user",
          parts: [{ text: userMessage }],
        },
      ];
      console.log(
        "Histórico enviado para o Gemini:",
        JSON.stringify(chatHistory, null, 2)
      );

      // Chama a API do Gemini
      const result = await model.generateContent({
        contents: chatHistory,
        generationConfig,
        safetySettings,
      });
      console.log(
        "Resultado bruto do Gemini:",
        JSON.stringify(result, null, 2)
      ); // Log do resultado completo

      // Processa a resposta
      if (result.response) {
        const botResponse = result.response.text();
        console.log("Enviando para o usuário:", botResponse);
        res.json({ reply: botResponse });
      } else {
        console.error(
          "Gemini não retornou uma resposta válida ou foi bloqueada. Resultado:",
          result
        );
        type GeminiResponse = {
          promptFeedback?: {
            blockReason?: string;
          };
          text(): string;
        };
        // ====> CORREÇÃO: Acesse promptFeedback diretamente do 'result' <====
        const response = result.response as GeminiResponse;
        const blockReason = response.promptFeedback?.blockReason; // Use optional chaining aqui também
        const errorMessage = blockReason
          ? `Não consegui responder por causa de segurança (${blockReason}). Tente reformular.`
          : "Não foi possível obter uma resposta da IA (sem motivo especificado)."; // Mensagem padrão mais clara

        console.error("Mensagem de erro final:", errorMessage); // Log do erro que será enviado
        res.status(500).json({ error: errorMessage });
      }
      // ===== FIM DA LÓGICA PRINCIPAL =====
    } catch (error) {
      console.error("Erro ao processar mensagem do chat:", error);
      res
        .status(500)
        .json({ error: "Erro interno do servidor ao falar com a IA." });
      // O catch já finaliza implicitamente a execução aqui para esta requisição
    }
  }
);

app.get(
  "/api/furia/next-match",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const TEAM_ID = process.env.FURIA_CS2_TEAM_ID; // Lê o ID (FaZe ou Furia) do .env

    if (!PANDASCORE_KEY || !TEAM_ID) {
      res
        .status(500)
        .json({
          message: "Configuração da API PandaScore incompleta no servidor.",
        });
      return;
    }

    try {
      console.log(
        `Buscando próximo jogo de CSGO/CS2 (not_started) envolvendo o time ID: ${TEAM_ID}`
      );

      // ====> USA O ENDPOINT GENÉRICO DE PARTIDAS CSGO COM FILTRO DE STATUS <====
      const response = await axios.get<PandaScoreMatch[]>(
        `${PANDASCORE_BASE_URL}/csgo/matches`,
        {
          headers: { Authorization: `Bearer ${PANDASCORE_KEY}` },
          params: {
            sort: "begin_at",
            "page[size]": 1,
            "filter[status]": "not_started",
            "filter[opponent_id]": TEAM_ID,
            // 'range[begin_at]': `${new Date().toISOString()},` // Opcional
          },
        }
      );

      // Como pedimos page[size]=1 e filtramos por not_started e opponent_id,
      // a API deve retornar 0 ou 1 partida.
      if (response.data && response.data.length > 0) {
        const match = response.data[0];
        console.log("Próximo jogo encontrado:", match.slug);

        let opponentData: TeamInfo | null = null;
        let queriedTeamData: TeamInfo | null = null; // Variável para guardar os dados da FURIA/Time Principal

        // Encontra os dados de ambos os times na lista de oponentes da partida
        if (match.opponents && match.opponents.length > 0) {
          const opponentTeamPayload = match.opponents.find(
            (op: any) => op.opponent?.id !== parseInt(TEAM_ID, 10)
          )?.opponent; // Pega o objeto 'opponent' diretamente

          const queriedTeamPayload = match.opponents.find(
            (op: any) => op.opponent?.id === parseInt(TEAM_ID, 10)
          )?.opponent; // Pega o objeto 'opponent' do time principal

          if (opponentTeamPayload) {
            opponentData = {
              id: opponentTeamPayload.id,
              name: opponentTeamPayload.name,
              imageUrl: opponentTeamPayload.image_url,
            };
          }
          if (queriedTeamPayload) {
            queriedTeamData = {
              id: queriedTeamPayload.id,
              name: queriedTeamPayload.name, // Ex: "FURIA"
              imageUrl: queriedTeamPayload.image_url, // Ex: URL do logo da FURIA
            };
          }
        }

        // Formata a resposta incluindo os dados do time principal
        const nextMatchData = {
          id: match.id,
          status: match.status,
          queriedTeam: queriedTeamData, // <<< ADICIONADO
          opponent: opponentData, // <<< Renomeado para clareza (era opponent antes)
          league: {
            id: match.league.id,
            name: match.league.name,
            imageUrl: match.league.image_url,
          },
          serie: { id: match.serie.id, fullName: match.serie.full_name },
          tournament: { id: match.tournament.id, name: match.tournament.name },
          beginAt: match.begin_at,
        };
        res.json(nextMatchData);
      } else {
        console.log(
          `Nenhum próximo jogo (not_started) encontrado para o time ID ${TEAM_ID} via /csgo/matches.`
        );
        res
          .status(404)
          .json({
            message: `Nenhum próximo jogo encontrado para o time ID ${TEAM_ID}.`,
          });
      }
    } catch (error: any) {
      next(error);
    }
  }
);

app.listen(port, () => {
  console.log(`🚀 API Web Chat FURIA rodando na porta ${port}`);
});
