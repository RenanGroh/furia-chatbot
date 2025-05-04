// web/src/pages/PlayersPage.tsx
// ATUALIZADO com imports de assets

import React, { useState } from "react";
import Hover3DCard from "../components/Hover3DCard";
import FocusView from '../components/FocusView';
import { PlayerData } from '../types/player'; // Manter se FocusView usa PlayerData
import "./PlayersPage.css";

// --- Importar TODOS os assets usados nos dados ---
import imgCardFallen from "../assets/images/players/Fallen-Card.png";
import imgPhotoFallen from "../assets/images/players/Fallen.jpg";
import imgFlagBR from "../assets/images/flags/br.png"; // Use .png ou .svg conforme o arquivo real

import imgCardKscerato from "../assets/images/players/KScerato-card.png"; // Verifique a capitalização 'KS'
import imgPhotoKscerato from "../assets/images/players/kscerato.jpg"; // Verifique a capitalização 'kscerato'

import imgCardYuurih from "../assets/images/players/yuurih-card.png";
import imgPhotoYuurih from "../assets/images/players/Yuurih.jpg"; // Verifique a capitalização 'Yuurih'

import imgCardYekindar from "../assets/images/players/yekindar-card.png";
import imgPhotoYekindar from "../assets/images/players/Yekindar.png"; // Verifique a capitalização 'Yekindar'
import imgFlagLV from "../assets/images/flags/Lt.svg"; // Assumindo SVG para Letônia (Lt.svg), verifique nome/extensão

import imgCardMolodoy from "../assets/images/players/molodoy-card.png";
import imgPhotoMolodoy from "../assets/images/players/molodoy.png"; // Verifique a capitalização 'Yekindar'
import imgFlagCz from "../assets/images/flags/Cz.svg"; // Assumindo SVG para Letônia (Lt.svg), verifique nome/extensão

// --------------------------------------------------

// Atualizar dados mock para usar as variáveis importadas
const furiaPlayersData: PlayerData[] = [
  {
   nickname: "FalleN",
   realName: "Gabriel Toledo",
   cardImageUrl: imgCardFallen,     // Usa variável
   photoImageUrl: imgPhotoFallen,    // Usa variável
   role: "AWPer / IGL",
   nationality: { name: "Brasil", flagUrl: imgFlagBR }, // Usa variável
   stats: { rating: 1.08, kd: "1.07", hsPercent: 38.2 }
 },
  {
   nickname: "KSCERATO",
   realName: "Kaike Cerato",
   cardImageUrl: imgCardKscerato,  // Usa variável
   photoImageUrl: imgPhotoKscerato, // Usa variável
   role: "Rifler (Lurker)",
   nationality: { name: "Brasil", flagUrl: imgFlagBR }, // Usa variável
   stats: { rating: 1.14, kd: "1.21", hsPercent: 51.5 }
 },
   {
   nickname: "yuurih",
   realName: "Yuri Santos",
   cardImageUrl: imgCardYuurih,    // Usa variável
   photoImageUrl: imgPhotoYuurih,   // Usa variável
   role: "Rifler (Entry/Support)",
   nationality: { name: "Brasil", flagUrl: imgFlagBR }, // Usa variável
   stats: { rating: 1.13, kd: "1.19", hsPercent: 48.1 }
 },
  {
   nickname: "Yekindar",
   realName: "Mareks Gaļinskis",
   cardImageUrl: imgCardYekindar, // Usa variável
   photoImageUrl: imgPhotoYekindar, // Usa variável
   role: "Rifler (Entry)",
   nationality: { name: "Letônia", flagUrl: imgFlagLV }, // Usa variável da Letônia
   stats: { rating: 1.05, kd: "1.02", hsPercent: 53.0 }
 },
  { // Mantenha comentado ou importe e adicione os assets corretos para molodoy/Cazaquistão
   nickname: "molodoy",
   realName: "Danil Golubenko",
   cardImageUrl: imgCardMolodoy,  // Precisa importar imgCardMolodoy
   photoImageUrl: imgPhotoMolodoy, // Precisa importar imgPhotoMolodoy
   role: "AWPer",
   nationality: { name: "Cazaquistão", flagUrl: imgFlagCz }, // Precisa importar imgFlagKZ (com nome/extensão corretos)
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
    <section className={`players-page-container ${selectedPlayer ? 'blurred' : ''}`}>
      <h2>LINE-UP FURIA CS2</h2>
      <div className="player-cards-grid">
        {furiaPlayersData.map((player) => (
          // Hover3DCard agora recebe a variável importada na prop imageUrl
          <Hover3DCard
            key={player.nickname}
            imageUrl={player.cardImageUrl}
            altText={`Card do jogador ${player.nickname}`}
            onClick={() => handleCardClick(player)}
          />
        ))}
      </div>

      {/* FocusView provavelmente já recebe PlayerData e usa photoImageUrl/flagUrl
          internamente. Se FocusView ou StatsPanel também usarem <img> tags
          com caminhos, eles precisarão ser ajustados para receber as
          variáveis importadas como props, ou os componentes deverão
          fazer seus próprios imports se as imagens forem fixas para eles.
          Neste exemplo, assumimos que FocusView/StatsPanel recebem os dados
          (incluindo as URLs já processadas/importadas) via 'player' prop.
       */}
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