import React from 'react';
import { PlayerData } from '../types/player';
import './StatsPanel.css'; 

interface StatsPanelProps {
  player: PlayerData;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ player }) => {
  return (
    <div className="stats-panel">
      {/* Opcional: Mostrar foto normal do jogador */}
      {player.photoImageUrl && (
          <img src={player.photoImageUrl} alt={player.nickname} className="player-photo"/>
      )}

      <h2>{player.nickname}</h2>
      {player.realName && <p className="real-name">{player.realName}</p>}

      <div className="info-grid">
         {player.nationality && (
            <div className="info-item">
                <span className="label">País:</span>
                <span className="value">
                    <img src={player.nationality.flagUrl} alt={player.nationality.name} />
                    {player.nationality.name}
                </span>
            </div>
         )}
         <div className="info-item">
             <span className="label">Função:</span>
             <span className="value">{player.role}</span>
         </div>
         {player.stats?.rating && (
             <div className="info-item">
                 <span className="label">Rating:</span>
                 <span className="value">{player.stats.rating.toFixed(2)}</span>
             </div>
         )}
          {player.stats?.kd && (
             <div className="info-item">
                 <span className="label">KD:</span>
                 <span className="value">{player.stats.kd}</span>
             </div>
         )}
          {player.stats?.hsPercent && (
             <div className="info-item">
                 <span className="label">Headshot %:</span>
                 <span className="value">{player.stats.hsPercent.toFixed(1)}%</span>
             </div>
         )}
         {/* Adicione mais stats conforme necessário */}
      </div>

    </div>
  );
};

export default StatsPanel;