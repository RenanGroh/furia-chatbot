// src/components/UpcomingGamesSection.tsx
// COMPLETO - SUBSTITUA TODO O CONTEÚDO DESTE ARQUIVO

import React, { useState, useEffect } from 'react';
import './UpcomingGamesSection.css'; // Certifique-se de que este arquivo CSS existe e é importado

// --- INTERFACES (Definidas aqui para autossuficiência do componente) ---
interface TeamInfo {
    id: number;
    name: string;
    imageUrl: string | null;
}

interface MatchData {
    id: number;
    status: string;
    queriedTeam: TeamInfo | null; // Time principal (FURIA)
    opponent: TeamInfo | null; // Time oponente
    league: { id: number; name: string; imageUrl: string | null };
    serie: { id: number; fullName: string };
    tournament: { id: number; name: string; };
    beginAt: string; // ISO 8601 UTC
}

// --- FUNÇÕES HELPER (Definidas aqui) ---

const generateGoogleCalendarLink = (match: MatchData): string => {
    if (!match.opponent || !match.queriedTeam) return '#';
    const startTime = new Date(match.beginAt);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Estima 2h
    const formatDate = (date: Date): string => date.toISOString().replace(/-|:|\.\d{3}/g, '');
    const eventTitle = `${match.queriedTeam.name} vs ${match.opponent.name} - ${match.league.name}`;
    const eventDetails = `Jogo da ${match.serie.fullName} (${match.tournament.name}).\n\nAcompanhe a ${match.queriedTeam.name}!`;
    const url = new URL('https://www.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', eventTitle);
    url.searchParams.append('dates', `${formatDate(startTime)}/${formatDate(endTime)}`);
    url.searchParams.append('details', eventDetails);
    return url.toString();
};

const formatDateTime = (isoString: string | null | undefined): { date: string, time: string, relative?: string } => {
    if (!isoString) return { date: '-', time: '-', relative: 'Data indefinida' };
    const date = new Date(isoString);
    const now = new Date();
    // Ajuste para comparar apenas datas, ignorando horas para "Hoje", "Amanhã"
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfEventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = startOfEventDate.getTime() - startOfToday.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let relative = '';
    if (diffDays === 0) relative = 'Hoje';
    else if (diffDays === 1) relative = 'Amanhã';
    else if (diffDays > 1 && diffDays <= 7) relative = `Em ${diffDays} dias`;
    // Não mostrar "Já ocorreu" aqui, a API deve filtrar isso.

    return {
        // Exemplo: 10 de Maio - formato mais visual
        date: date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long'}),
        // Exemplo: 05:00 BRT
        time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }),
        relative: relative || undefined,
    };
};

// --- COMPONENTE ---

const UpcomingGamesSection: React.FC = () => {
    const [nextMatch, setNextMatch] = useState<MatchData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNextMatch = async () => {
            setIsLoading(true);
            setError(null);
            setNextMatch(null);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const response = await fetch(`${apiUrl}/api/furia/next-match`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Nenhum próximo jogo agendado.");
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        setError(errorData.message || `Erro ${response.status} ao buscar jogo.`);
                    }
                } else {
                    const data: MatchData = await response.json();
                    setNextMatch(data);
                    setError(null);
                }
            } catch (err: unknown) {
                console.error("Erro no fetch de UpcomingGamesSection:", err);
                let errorMessage = 'Falha na comunicação com o servidor.';
                if (err instanceof Error) errorMessage = err.message;
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNextMatch();
    }, []);

    // --- Lógica de Renderização ---

    const renderContent = () => {
        if (isLoading) {
            return <div className="upcoming-game-widget loading"><span></span> Carregando...</div>;
        }

        if (error) {
             // Usando a mesma classe 'info-state' e 'error' da página principal para consistência, se desejar
            return <div className="upcoming-game-widget info-state error">{error}</div>;
        }

        if (nextMatch && nextMatch.opponent) {
            const { date, time, relative } = formatDateTime(nextMatch.beginAt);
            const googleLink = generateGoogleCalendarLink(nextMatch);
            const mainTeamName = nextMatch.queriedTeam?.name || 'FURIA';
            const mainTeamLogo = nextMatch.queriedTeam?.imageUrl || '/images/furia-logo-simple.png'; // Fallback logo Furia

            return (
                <div className="upcoming-game-widget match-info"> {/* Adiciona classe base */}
                    {/* Times */}
                    <div className="widget-teams-section">
                        <div className="widget-team">
                            <img
                                src={mainTeamLogo}
                                alt={mainTeamName}
                                className="widget-team-logo"
                                onError={(e) => { e.currentTarget.src = '/images/placeholder-logo.png'; }}/>
                            <span className="widget-team-name">{mainTeamName}</span>
                        </div>
                        <div className="widget-vs-separator">VS</div>
                        <div className="widget-team">
                             <img
                                src={nextMatch.opponent.imageUrl || '/images/placeholder-logo.png'}
                                alt={nextMatch.opponent.name}
                                className="widget-team-logo"
                                onError={(e) => { e.currentTarget.src = '/images/placeholder-logo.png'; }}/>
                             <span className="widget-team-name">{nextMatch.opponent.name}</span>
                        </div>
                    </div>

                    {/* Detalhes (Torneio / Data) */}
                    <div className="widget-details-section">
                        <div className="widget-detail-item tournament">
                            <span className="widget-icon">🏆</span>
                            <div className="widget-text">
                                <span className="widget-label">Torneio</span>
                                <span className="widget-value" title={`${nextMatch.league.name} - ${nextMatch.serie.fullName} (${nextMatch.tournament.name})`}>
                                    {nextMatch.league.name} {/* Pode mostrar só a liga principal se for longo */}
                                </span>
                            </div>
                        </div>
                        <div className="widget-detail-item datetime">
                             <span className="widget-icon">📅</span>
                             <div className="widget-text">
                                 <span className="widget-label">Data & Hora</span>
                                 <span className="widget-value">{date} - {time}</span>
                                 {relative && <span className="widget-sub-value relative-time">{relative}</span>}
                             </div>
                        </div>
                    </div>

                    {/* Botão */}
                    <div className="widget-action-section">
                         <a href={googleLink} target="_blank" rel="noopener noreferrer" className="widget-calendar-button" title="Adicionar ao Google Calendar">
                            <span className="widget-button-icon">➕</span>
                            Adicionar à Agenda
                         </a>
                    </div>
                </div>
            );
        }

        // Fallback: Se não está carregando, não tem erro e não tem partida válida
         return <div className="upcoming-game-widget info-state">Fique ligado para o próximo confronto!</div>;
    };

    // O componente retorna a chamada da função de renderização
    return renderContent();

};

export default UpcomingGamesSection;