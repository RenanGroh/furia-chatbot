"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const HomePage = () => {
    return (<div>
      <h2>Bem-vindo ao Portal do Fã FURIA CS2!</h2>
      <p>Aqui você encontra tudo sobre a pantera: próximos jogos, informações dos jogadores, chat com outros fãs e muito mais.</p>
      {/* Adicionar mais conteúdo: notícias, vídeos recentes, etc. */}
      <img src="/furia-banner.jpg" alt="Banner FURIA" style={{ width: '100%', marginTop: '20px', borderRadius: '8px' }}/> {/* Exemplo com banner */}
    </div>);
};
exports.default = HomePage;
