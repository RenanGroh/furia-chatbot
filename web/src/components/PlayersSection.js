"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./PlayersSection.css"); // Criaremos este CSS
const PlayersSection = () => {
    // Por enquanto, apenas placeholders
    const playerCount = 5; // Quantos jogadores mostrar (ajuste conforme line-up)
    const placeholders = Array.from({ length: playerCount }, (_, i) => i);
    return (<section className="players-section">
      <h2>Jogadores</h2>
      <div className="player-cards-container">
        {placeholders.map(index => (<div key={index} className="player-card-placeholder">
            {/* Info do jogador aqui */}
          </div>))}
      </div>
    </section>);
};
exports.default = PlayersSection;
