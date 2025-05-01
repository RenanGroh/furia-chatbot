import React from 'react';
import './PlayerCard.css'; // Criaremos este para ajustes específicos

interface PlayerCardProps {
  player: {
    nickname: string;
    realName?: string;
    imageUrl: string;
    role: string;
    nationality?: {
      name: string;
      flagUrl: string;
    };
  };
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Adiciona a classe 'holo' para ativar o efeito
  // A classe de "tipo" (como 'grass', 'fire') pode ser usada para temas
  // Vamos usar uma classe fixa 'furia-theme' por enquanto
  return (
    <article className="card furia-theme holo"> {/* Usar a classe 'card' e 'holo' */}

      {/* 1. Cabeçalho com Nome e Role/Nacionalidade */}
      <div className="card-header"> {/* Classe genérica, pode ser adaptada */}
        <span className="pokemon-name">{player.nickname}</span> {/* Reusa classe 'pokemon-name' */}
        <div className="pokemon-type"> {/* Reusa classe 'pokemon-type' */}
          {player.nationality && (
            <img
              src={player.nationality.flagUrl}
              alt={player.nationality.name}
              className="nationality-flag" // Classe customizada
            />
          )}
          <span className="role-text">{player.role}</span> {/* Classe customizada */}
        </div>
      </div>

      {/* 2. Imagem Principal (Onde o efeito holo atua) */}
      {/* O CSS original aplica o holo na div .pokemon-image */}
      <div className="pokemon-image">
        <img src={player.imageUrl} alt={player.nickname} loading="lazy" />
      </div>

      {/* 3. Área de "Stats" ou Informações Adicionais */}
      {/* Podemos simplificar ou adaptar esta seção */}
      <div className="stats-container"> {/* Classe customizada */}
        {player.realName && (
          <p className="real-name">Nome: {player.realName}</p>
        )}
        {/* Adicionar mais stats aqui se desejar (Rating, HS%, etc.) */}
        {/* <p>Rating: 1.10</p> */}
      </div>

      {/* 4. Rodapé (Opcional) */}
      <div className="card-footer"> {/* Classe genérica */}
         <p>FURIA Esports - CS2 Roster</p>
      </div>

    </article>
  );
};

export default PlayerCard;