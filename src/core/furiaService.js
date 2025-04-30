"use strict";
// src/core/furiaService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoJogo = void 0;
// Exporta a função para poder ser importada em outros arquivos
const getProximoJogo = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('furiaService: Buscando (mock) próximo jogo...');
    try {
        // Dados mockados por enquanto
        const jogoMockado = {
            adversario: 'Vitality Mock Service', // Mudei um pouco para confirmar que está vindo daqui
            campeonato: 'Mock Service Masters',
            data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Agendado (Service)',
        };
        return jogoMockado;
    }
    catch (error) {
        console.error("Erro ao buscar próximo jogo:", error);
        return null;
    }
});
exports.getProximoJogo = getProximoJogo;
// Adicione outras funções de serviço aqui no futuro
// export const getJogadores ...
