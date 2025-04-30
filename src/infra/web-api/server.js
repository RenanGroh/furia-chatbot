"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
// Importe seu serviço para buscar dados da FURIA (se for usar RAG)
const furiaService_1 = require("../../core/furiaService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.API_PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Essencial para receber o corpo da requisição POST
// Configuração do Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("Variável de ambiente GEMINI_API_KEY não definida!");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
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
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
app.post("/api/chat/send-message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let contextInfo = "";
        const userMessage = req.body.message;
        if (!userMessage) {
            // Adicione 'return;' após enviar a resposta em blocos 'if' que terminam a execução
            res.status(400).json({ error: "Nenhuma mensagem fornecida." });
            return;
        }
        console.log("Recebido do usuário:", userMessage);
        // --- BLOCO PARA ADICIONAR CONTEXTO (RAG) ---
        if (userMessage.toLowerCase().includes("próximo jogo")) {
            console.log("Mensagem inclui 'próximo jogo', buscando contexto RAG...");
            try {
                const jogo = yield (0, furiaService_1.getProximoJogo)();
                if (jogo) {
                    // Atribui valor à variável contextInfo externa SE encontrar o jogo
                    contextInfo = ` Contexto adicional: O próximo jogo da FURIA é contra ${jogo.adversario} em ${new Date(jogo.data).toLocaleDateString("pt-BR")} pelo campeonato ${jogo.campeonato}.`; // Adicionei um espaço no início para separar
                    console.log("Contexto RAG adicionado:", contextInfo);
                }
                else {
                    console.log("Contexto RAG: Próximo jogo não encontrado.");
                }
            }
            catch (e) {
                console.error("Erro ao buscar contexto RAG:", e);
            }
        } // --- FIM DO BLOCO PARA ADICIONAR CONTEXTO ---
        const chatHistory = [
            {
                // Define o papel e o contexto inicial do bot
                role: "user",
                parts: [
                    {
                        text: `Você é um chatbot assistente especializado na equipe
              de e-sports FURIA (especialmente CS2). Seja simpático, informativo
              e um verdadeiro fã da pantera! Responda perguntas sobre jogadores
              atuais (como FalleN, kscerato, yuurih, arT, chelo), próximos jogos,
              história, conquistas e notícias recentes. Se precisar de informações
              específicas como data/hora exata de jogos futuros, avise que você pode
              buscar mas pode demorar um pouco ou não ter a info 100% atualizada, 
              a menos que ela seja fornecida no contexto. ${contextInfo}`,
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
        console.log("Histórico enviado para o Gemini:", JSON.stringify(chatHistory, null, 2));
        // Chama a API do Gemini
        const result = yield model.generateContent({
            contents: chatHistory,
            generationConfig,
            safetySettings,
        });
        console.log("Resultado bruto do Gemini:", JSON.stringify(result, null, 2)); // Log do resultado completo
        // Processa a resposta
        if (result.response) {
            const botResponse = result.response.text();
            console.log("Enviando para o usuário:", botResponse);
            res.json({ reply: botResponse });
        }
        else {
            console.error("Gemini não retornou uma resposta válida ou foi bloqueada. Resultado:", result);
            // ====> CORREÇÃO: Acesse promptFeedback diretamente do 'result' <====
            const response = result.response;
            const blockReason = (_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason; // Use optional chaining aqui também
            const errorMessage = blockReason
                ? `Não consegui responder por causa de segurança (${blockReason}). Tente reformular.`
                : "Não foi possível obter uma resposta da IA (sem motivo especificado)."; // Mensagem padrão mais clara
            console.error("Mensagem de erro final:", errorMessage); // Log do erro que será enviado
            res.status(500).json({ error: errorMessage });
        }
        // ===== FIM DA LÓGICA PRINCIPAL =====
    }
    catch (error) {
        console.error("Erro ao processar mensagem do chat:", error);
        res
            .status(500)
            .json({ error: "Erro interno do servidor ao falar com a IA." });
        // O catch já finaliza implicitamente a execução aqui para esta requisição
    }
}));
app.listen(port, () => {
    console.log(`🚀 API Web Chat FURIA rodando na porta ${port}`);
});
