import React, { useState, useEffect } from "react";
import "./UpcomingGamesPage.css";

interface TeamInfo {
  id: number;
  name: string;
  imageUrl: string | null;
}

interface MatchData {
  id: number;
  status: string;
  opponent: TeamInfo | null;
  league: { id: number; name: string; imageUrl: string | null };
  serie: { id: number; fullName: string };
  tournament: {
    id: number;
    name: string /* Adicionar 'city' ou 'location' se a API fornecer */;
  };
  beginAt: string; // ISO 8601 UTC
  // Adicionar streams se quiser mostrar links
  // streams_list?: { language: string; raw_url: string; embed_url: string }[];
}

// Função helper para gerar link do Google Calendar (manter como antes)
const generateGoogleCalendarLink = (match: MatchData): string => {
  if (!match.opponent) return "#";
  const startTime = new Date(match.beginAt);
  const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Estimar 2h
  const formatDate = (date: Date): string =>
    date.toISOString().replace(/-|:|\.\d{3}/g, "");
  const eventTitle = `FURIA vs ${match.opponent.name} - ${match.league.name}`;
  const eventDetails = `Jogo da ${match.serie.fullName} (${match.tournament.name}).\n\nAcompanhe a FURIA! #DIADEFURIA`;
  const url = new URL("https://www.google.com/calendar/render");
  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", eventTitle);
  url.searchParams.append(
    "dates",
    `${formatDate(startTime)}/${formatDate(endTime)}`
  );
  url.searchParams.append("details", eventDetails);
  return url.toString();
};

// Função helper para formatar data/hora
const formatDateTime = (
  isoString: string | null | undefined
): { date: string; time: string; relative?: string } => {
  if (!isoString) return { date: "-", time: "-", relative: "Data indefinida" };
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let relative = "";
  if (diffDays === 0 && date.getDate() === now.getDate()) {
    relative = "Hoje";
  } else if (diffDays === 1 && date.getDate() === now.getDate() + 1) {
    relative = "Amanhã";
  } else if (diffDays > 1 && diffDays <= 7) {
    relative = `Em ${diffDays} dias`;
  } else if (diffDays < 0) {
    relative = "Já ocorreu"; // Ou tratar status "finished"
  }

  return {
    date: date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    relative: relative || undefined, // Só retorna se tiver valor
  };
};

const UpcomingGamesPage: React.FC = () => {
  const [nextMatch, setNextMatch] = useState<MatchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [furiaLogo] = useState<string>("src/assets/images/furia-logo.png"); // Logo padrão

  useEffect(() => {
    const fetchNextMatch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001"; // Usa import.meta.env
        const response = await fetch(`${apiUrl}/api/furia/next-match`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Nenhum próximo jogo agendado para a FURIA no momento.");
            setNextMatch(null);
          } else {
            const errorData = await response
              .json()
              .catch(() => ({ message: `Erro ${response.status}` })); // Tratamento para erro não-JSON
            throw new Error(
              errorData.message || `Erro ao buscar próximo jogo.`
            );
          }
        } else {
          const data: MatchData = await response.json();
          setNextMatch(data);
        }
      } catch (err: unknown) {
        // Use 'unknown' como sugerido
        console.error("Erro ao buscar próximo jogo:", err);

        // Verifica o tipo do erro antes de acessar propriedades
        let errorMessage =
          "Falha ao conectar com o servidor ou erro desconhecido."; // Mensagem padrão
        if (err instanceof Error) {
          // Se for uma instância da classe Error padrão, podemos acessar .message
          errorMessage = err.message;
        } else if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof err.message === "string"
        ) {
          // Se for um objeto com uma propriedade 'message' do tipo string
          errorMessage = err.message;
        } else if (typeof err === "string") {
          // Se o próprio erro for uma string
          errorMessage = err;
        }
        // Poderia adicionar mais verificações aqui se necessário

        setError(errorMessage); // Define a mensagem de erro verificada
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextMatch();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <span></span> Carregando próximo confronto...
        </div>
      );
    }

    if (error) {
      return <div className="info-state error">{error}</div>;
    }

    if (!nextMatch || !nextMatch.opponent) {
      return (
        <div className="info-state">
          Fique ligado! Anunciaremos o próximo jogo da FURIA em breve.
          #DIADEFURIA
        </div>
      );
    }

    // Jogo encontrado, renderiza o card
    const { date, time, relative } = formatDateTime(nextMatch.beginAt);

    return (
      <div className="match-card animate-fade-in">
        {/* Seção Times */}
        <div className="teams-section">
          <div className="team team-furia">
            <img src={furiaLogo} alt="FURIA Logo" className="team-logo" />
            <span className="team-name">FURIA</span>
          </div>
          <div className="vs-separator">VS</div>
          <div className="team team-opponent">
            <img
              src={
                nextMatch.opponent.imageUrl || "/images/placeholder-logo.png"
              }
              alt={`${nextMatch.opponent.name} Logo`}
              className="team-logo"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder-logo.png";
              }} // Fallback se imagem falhar
            />
            <span className="team-name">{nextMatch.opponent.name}</span>
          </div>
        </div>

        {/* Seção Detalhes */}
        <div className="details-section">
          <div className="detail-item tournament">
            <span className="icon">🏆</span> {/* Ícone de Troféu */}
            <div className="text">
              <span className="label">Torneio</span>
              <span className="value">
                {nextMatch.league.name} - {nextMatch.serie.fullName}
              </span>
              {/* <span className="sub-value">{nextMatch.tournament.name}</span> */}
            </div>
          </div>
          <div className="detail-item datetime">
            <span className="icon">📅</span> {/* Ícone de Calendário */}
            <div className="text">
              <span className="label">Data & Hora</span>
              <span className="value">
                {date} - {time}
              </span>
              {relative && (
                <span className="sub-value relative-time">{relative}</span>
              )}
            </div>
          </div>
          {/* Adicionar Local se disponível na API
                    {nextMatch.tournament.location && ( // Exemplo, ajuste o nome do campo
                         <div className="detail-item location">
                            <span className="icon">📍</span>
                            <div className="text">
                                <span className="label">Local</span>
                                <span className="value">{nextMatch.tournament.location}</span>
                            </div>
                        </div>
                    )}
                    */}
        </div>

        {/* Seção Botão Agenda */}
        <div className="action-section">
          <a
            href={generateGoogleCalendarLink(nextMatch)}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-button"
            title="Adicionar ao Google Calendar"
          >
            <span className="icon">➕</span> {/* Ícone de Adicionar */}
            Adicionar à Agenda
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="upcoming-games-page">
      <h2>Próximo Confronto</h2>
      {renderContent()}
    </section>
  );
};

export default UpcomingGamesPage;
