import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'; // Para portal
import Hover3DCard from './Hover3DCard';
import StatsPanel from './StatsPanel';
import { PlayerData } from '../types/player';
import './FocusView.css'; // Criaremos

interface FocusViewProps {
  player: PlayerData;
  onClose: () => void;
}

const FocusView: React.FC<FocusViewProps> = ({ player, onClose }) => {

  // Efeito para adicionar/remover classe no body (evitar scroll do fundo)
   useEffect(() => {
     document.body.classList.add('no-scroll');
     // Cleanup function para remover a classe quando o componente desmontar
     return () => {
       document.body.classList.remove('no-scroll');
     };
   }, []); // Array vazio garante que rode só na montagem/desmontagem

  // Usar um portal para renderizar o FocusView fora da hierarquia normal do DOM,
  // diretamente no body, facilitando o posicionamento fixed e z-index.
  return ReactDOM.createPortal(
    <div className="focus-view">
      {/* Overlay que chama onClose ao clicar */}
      <div className="focus-overlay" onClick={onClose}></div>

      {/* Container para o card focado */}
      <div className="focused-card-container">
        <Hover3DCard
          imageUrl={player.cardImageUrl}
          altText={`Card focado de ${player.nickname}`}
          // Desabilitar interação 3D no modo focado? (Opcional)
          // Ou manter para um efeito legal
        />
      </div>

      {/* Container para o painel de stats */}
      <div className="stats-panel-container">
         <StatsPanel player={player} />
         {/* Botão para fechar explicitamente */}
         <button className="close-focus-button" onClick={onClose} aria-label="Fechar">
             × {/* Ícone de 'X' */}
         </button>
      </div>

    </div>,
    document.body // Renderiza o portal diretamente no body
  );
};

export default FocusView;