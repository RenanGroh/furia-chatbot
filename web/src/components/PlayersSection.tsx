import React from 'react';
import './PlayersSection.css'; // Criaremos este CSS

const PlayersSection: React.FC = () => {
  // Por enquanto, apenas placeholders
  const playerCount = 5; // Quantos jogadores mostrar (ajuste conforme line-up)
  const placeholders = Array.from({ length: playerCount }, (_, i) => i);

  return (
    <section className="players-section">
      <h2>Jogadores</h2>
      <div className="player-cards-container">
        {placeholders.map(index => (
          <div key={index} className="player-card-placeholder">
            {/* Info do jogador aqui */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayersSection;