import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// Importe seu serviço para buscar dados da FURIA (se for usar RAG)
import { getJogadoresAtuais, getProximoJogo } from "../../core/furiaService";

dotenv.config();

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

app.listen(port, () => {
  console.log(`🚀 API Web Chat FURIA rodando na porta ${port}`);
});