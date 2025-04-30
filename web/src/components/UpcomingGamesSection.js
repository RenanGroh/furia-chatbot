"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./UpcomingGamesSection.css"); // Criaremos este CSS
const UpcomingGamesSection = () => {
    const [proximoJogo, setProximoJogo] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Busca dados da sua API backend
        fetch('http://localhost:3001/api/proximo-jogo') // Garanta que a API esteja rodando
            .then(response => {
            if (!response.ok)
                throw new Error('Falha ao buscar dados');
            return response.json();
        })
            .then((data) => {
            setProximoJogo(data);
            setLoading(false);
        })
            .catch(err => {
            console.error("Erro buscando próximo jogo:", err);
            setError(err.message);
            setLoading(false);
        });
    }, []); // Roda só uma vez
    return (<section className="upcoming-games-section">
      <h2>Próximos jogos</h2>
      <div className="game-info-container">
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {proximoJogo && !loading && !error && (<div>
            <p><strong>Vs:</strong> {proximoJogo.adversario}</p>
            <p><strong>Camp:</strong> {proximoJogo.campeonato}</p>
            <p><strong>Data:</strong> {new Date(proximoJogo.data).toLocaleString('pt-BR')}</p>
            {/* <p><strong>Status:</strong> {proximoJogo.status}</p> */}
          </div>)}
         {!proximoJogo && !loading && !error && (<p>Nenhuma informação de próximo jogo encontrada.</p>)}
      </div>
    </section>);
};
exports.default = UpcomingGamesSection;
