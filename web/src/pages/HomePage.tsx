import React from "react";
import { Link } from "react-router-dom"; // Para links internos
import UpcomingGamesSection from "../components/UpcomingGamesSection"; // Reutilizar componente de jogos
import Hover3DCard from "../components/Hover3DCard"; // Reutilizar card do jogador
import useScrollAnimation from "../hooks/useScrollAnimation"; // Importar o hook
import "./HomePage.css"; // Criaremos o CSS

// Dados Mock (substitua pelos dados reais ou chamada de API se tiver)
const homePagePlayers = [
  // Pegar apenas alguns para destaque
  { nickname: "FalleN", cardImageUrl: "/images/players/Fallen-Card.png" },
  { nickname: "KSCERATO", cardImageUrl: "/images/players/KScerato-card.png" },
  { nickname: "yuurih", cardImageUrl: "/images/players/yuurih-card.png" },
];

const mockNews = [
  {
    id: 1,
    title: "Quem é Yekindar? novo integrante da Furia",
    imageUrl: "/images/news/news1.png",
    link: "#",
  },
  {
    id: 2,
    title: "Análise Tática: O Domínio do FalleN",
    imageUrl: "/images/news/news2.png",
    link: "#",
  },
  {
    id: 3,
    title: "Quem são essas panteras? conheça o time feminino",
    imageUrl: "/images/news/news3.png",
    link: "#",
  },
];

const HomePage: React.FC = () => {
  // Hooks de animação para cada seção
  const heroAnim = useScrollAnimation({ threshold: 0.2 });
  const nextMatchAnim = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });
  const lineupAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const newsAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const communityAnim = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section
        ref={heroAnim.ref}
        className={`hero-section ${heroAnim.isVisible ? "is-visible" : ""}`}
      >
        {/* Opção 1: Vídeo de Fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-background-video"
        >
          <source src="/videos/furia-video.mp4" type="video/mp4" /> Your browser
          does not support the video tag.
        </video>
        {/* Opção 2: Imagem de Fundo (Comente o vídeo se usar imagem) */}
        <div className="hero-overlay"></div> {/* Overlay escuro */}
        <div className="hero-content">
          <h1 className="hero-title animate-slide-up">
            A ERA DA <span className="highlight">PANTERA</span>
          </h1>
          <p className="hero-subtitle animate-slide-up delay-1">
            Acompanhe cada jogada, vibre com cada vitória. Bem-vindo ao lar da
            torcida FURIA.
          </p>
          <Link
            to="/proximos-jogos"
            className="hero-cta-button animate-slide-up delay-2"
          >
            Ver Próximo Confronto
          </Link>
        </div>
      </section>

      {/* 2. proximo confronto */}
      <section
        ref={nextMatchAnim.ref}
        className={`next-match-section ${
          nextMatchAnim.isVisible ? "is-visible" : ""
        }`}
      >
        <div className="section-content animate-fade-in">
          {/* Renderiza diretamente o componente/página que já busca os dados */}
          <UpcomingGamesSection />
        </div>
      </section>

      {/* 3. Line-up Atual */}
      <section
        ref={lineupAnim.ref}
        className={`lineup-section ${lineupAnim.isVisible ? "is-visible" : ""}`}
      >
        <div className="section-content animate-slide-up">
          <h2>
            LINE-UP <span className="highlight">CS2</span>
          </h2>
          <div className="player-cards-preview">
            {homePagePlayers.map((player) => (
              <div key={player.nickname} className="player-card-wrapper">
                <Hover3DCard
                  imageUrl={player.cardImageUrl}
                  altText={`Card do jogador ${player.nickname}`}
                />
              </div>
            ))}
          </div>
          <Link to="/jogadores" className="see-more-link">
            Ver Line-up Completa
          </Link>
        </div>
      </section>

      {/* 4. Últimas Notícias/Destaques (Simulado) */}
      <section
        ref={newsAnim.ref}
        className={`news-section ${newsAnim.isVisible ? "is-visible" : ""}`}
      >
        <div className="section-content animate-fade-in">
          <h2>
            DESTAQUES <span className="highlight">RECENTES</span>
          </h2>
          <div className="news-grid">
            {mockNews.map((news) => (
              <a href={news.link} key={news.id} className="news-card">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="news-image"
                />
                <div className="news-overlay">
                  <h3 className="news-title">{news.title}</h3>
                </div>
              </a>
            ))}
          </div>
          {/* <Link to="/noticias" className="see-more-link">Ver Todas as Notícias</Link> */}
        </div>
      </section>

      {/* 5. Seção Comunidade */}
      <section
        ref={communityAnim.ref}
        className={`community-section ${
          communityAnim.isVisible ? "is-visible" : ""
        }`}
      >
        <div className="section-content animate-slide-up">
          <h2>
            JUNTE-SE À <span className="highlight">MATILHA</span>
          </h2>
          <p>
            Converse com outros fãs, participe de discussões e não perca nenhuma
            novidade nas nossas redes!
          </p>
          <div className="community-links">
            <Link to="/chat" className="community-button chat">
              Entrar no Chat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
