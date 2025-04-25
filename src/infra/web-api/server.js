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
// Importaremos a lógica do 'core' aqui depois
// import { getProximoJogo } from '../../core/furiaService';
const app = (0, express_1.default)();
const port = process.env.API_PORT || 3001; // Porta para a API
// Habilita o CORS para permitir requisições do frontend (que rodará em outra porta)
app.use((0, cors_1.default)());
// Middleware para parsear JSON no corpo das requisições (se precisar enviar dados POST)
app.use(express_1.default.json());
// Rota de Teste
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Pong! API está no ar.' });
});
// Rota Exemplo (BUSCAREMOS DADOS REAIS DEPOIS)
app.get('/api/proximo-jogo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // POR ENQUANTO: Retorna dados mockados
        // DEPOIS: Chamaremos a função real: const jogo = await getProximoJogo();
        const jogoMockado = {
            adversario: 'Time Rival Exemplo',
            campeonato: 'Campeonato Exemplo',
            data: new Date().toISOString(),
            status: 'Agendado',
        };
        console.log('API: Enviando próximo jogo mockado');
        res.json(jogoMockado);
    }
    catch (error) {
        console.error('Erro ao buscar próximo jogo:', error);
        res.status(500).json({ message: 'Erro ao buscar dados do próximo jogo.' });
    }
}));
// --- Adicione outras rotas aqui ---
app.listen(port, () => {
    console.log(`🚀 API Web Chat FURIA rodando na porta ${port}`);
});
