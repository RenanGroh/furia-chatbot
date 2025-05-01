import React, { useState } from "react";
import Hover3DCard from "../components/Hover3DCard";
import FocusView from '../components/FocusView';
import { PlayerData } from '../types/player';
import "./PlayersPage.css";

// Seus dados mock (agora só precisa da imagem e talvez nickname para alt text)
const furiaPlayersData: PlayerData[] = [
  {
   nickname: "FalleN",
   realName: "Gabriel Toledo",
   cardImageUrl: "public/images/players/Fallen-Card.png",
   photoImageUrl: "/images/players/fallen.png", // Foto normal opcional
   role: "AWPer / IGL",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.svg" },
   stats: { rating: 1.05, kda: "1.10/0.95/0.65", hsPercent: 38.2 }
 },
  {
   nickname: "KSCERATO",
   realName: "Kaike Cerato",
   cardImageUrl: "public/images/players/kscerato-card.png",
   photoImageUrl: "/images/players/kscerato.png",
   role: "Rifler (Lurker)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.svg" },
   stats: { rating: 1.18, kda: "1.25/0.88/0.75", hsPercent: 51.5 }
 },
  // ... Adicione dados completos para os outros jogadores (yuurih, chelo, arT)
   {
   nickname: "yuurih",
   realName: "Yuri Santos",
   cardImageUrl: "public/images/players/yuurih-card.png",
   photoImageUrl: "/images/players/yuurih.png",
   role: "Rifler (Entry/Support)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.svg" },
   stats: { rating: 1.12, kda: "1.20/0.92/0.70", hsPercent: 48.1 }
 },
  {
   nickname: "Yekindar",
   realName: "Marcelo Cespedes",
   cardImageUrl: "public/images/players/yekindar-card.png",
   photoImageUrl: "/images/players/chelo.png",
   role: "Rifler (Entry)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.svg" },
   stats: { rating: 1.03, kda: "1.08/1.05/0.68", hsPercent: 53.0 }
 },
  {
   nickname: "molodoy",
   realName: "Andrei Piovezan",
   cardImageUrl: "public/images/players/place-holder.png",
   photoImageUrl: "/images/players/art.png",
   role: "Rifler (Entry/IGL)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.svg" },
   stats: { rating: 0.99, kda: "1.05/1.10/0.65", hsPercent: 44.5 }
 },
];

const PlayersPage: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);

  const handleCardClick = (player: PlayerData) => {
    setSelectedPlayer(player);
  };

  const handleCloseFocus = () => {
    setSelectedPlayer(null);
  };

  return (
    // Adiciona classe 'blurred' quando um jogador está selecionado
    <section className={`players-page-container ${selectedPlayer ? 'blurred' : ''}`}>
      <h2>Line-up FURIA CS2</h2>
      <div className="player-cards-grid">
        {furiaPlayersData.map((player) => (
          <Hover3DCard
            key={player.nickname}
            imageUrl={player.cardImageUrl}
            altText={`Card do jogador ${player.nickname}`}
            // Passa a função de clique e dados do jogador
            onClick={() => handleCardClick(player)}
            // Indica se este é o card atualmente focado (para possível estilo futuro)
            // isSelected={selectedPlayer?.nickname === player.nickname}
          />
        ))}
      </div>

      {/* Renderiza a visão de foco SE um jogador estiver selecionado */}
      {selectedPlayer && (
        <FocusView
          player={selectedPlayer}
          onClose={handleCloseFocus}
        />
      )}
    </section>
  );
};

export default PlayersPage;