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
   cardImageUrl: "/images/players/Fallen-Card.png",
   photoImageUrl: "/images/players/Fallen.jpg", // Foto normal opcional
   role: "AWPer / IGL",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.png" },
   stats: { rating: 1.08, kd: "1.07", hsPercent: 38.2 }
 },
  {
   nickname: "KSCERATO",
   realName: "Kaike Cerato",
   cardImageUrl: "/images/players/KScerato-card.png",
   photoImageUrl: "/images/players/kscerato.jpg",
   role: "Rifler (Lurker)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.png" },
   stats: { rating: 1.14, kd: "1.21", hsPercent: 51.5 }
 },
  // ... Adicione dados completos para os outros jogadores (yuurih, chelo, arT)
   {
   nickname: "yuurih",
   realName: "Yuri Santos",
   cardImageUrl: "/images/players/yuurih-card.png",
   photoImageUrl: "/images/players/Yuurih.jpg",
   role: "Rifler (Entry/Support)",
   nationality: { name: "Brasil", flagUrl: "/images/flags/br.png" },
   stats: { rating: 1.13, kd: "1.19", hsPercent: 48.1 }
 },
  {
   nickname: "Yekindar",
   realName: "Mareks Gaļinskis",
   cardImageUrl: "/images/players/yekindar-card.png",
   photoImageUrl: "/images/players/Yekindar.png",
   role: "Rifler (Entry)",
   nationality: { name: "Letônia", flagUrl: "/images/flags/Lt.svg" },
   stats: { rating: 1.05, kd: "1.02", hsPercent: 53.0 }
 },
  {
   nickname: "molodoy",
   realName: "Danil Golubenko",
   cardImageUrl: "/images/players/molodoy-card.png",
   photoImageUrl: "/images/players/molodoy.png",
   role: "AWPer",
   nationality: { name: "Cazaquistão", flagUrl: "/images/flags/Cz.svg" },
   stats: { rating: 1.09, kd: "1.10", hsPercent: 44.5 }
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
      <h2>LINE-UP FURIA CS2</h2>
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