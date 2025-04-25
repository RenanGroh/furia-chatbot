import React, { useState, useEffect } from 'react';
import './UpcomingGamesSection.css'; // Criaremos este CSS

interface JogoInfo {
  adversario: string;
  campeonato: string;
  data: string;
  status: string;
}

const UpcomingGamesSection: React.FC = () => {
  const [proximoJogo, setProximoJogo] = useState<JogoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Busca dados da sua API backend
    fetch('http://localhost:3001/api/proximo-jogo') // Garanta que a API esteja rodando
      .then(response => {
        if (!response.ok) throw new Error('Falha ao buscar dados');
        return response.json();
      })
      .then((data: JogoInfo) => {
        setProximoJogo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro buscando próximo jogo:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Roda só uma vez

  return (
    <section className="upcoming-games-section">
      <h2>Próximos jogos</h2>
      <div className="game-info-container">
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {proximoJogo && !loading && !error && (
          <div>
            <p><strong>Vs:</strong> {proximoJogo.adversario}</p>
            <p><strong>Camp:</strong> {proximoJogo.campeonato}</p>
            <p><strong>Data:</strong> {new Date(proximoJogo.data).toLocaleString('pt-BR')}</p>
            {/* <p><strong>Status:</strong> {proximoJogo.status}</p> */}
          </div>
        )}
         {!proximoJogo && !loading && !error && (
             <p>Nenhuma informação de próximo jogo encontrada.</p>
         )}
      </div>
    </section>
  );
};

export default UpcomingGamesSection;