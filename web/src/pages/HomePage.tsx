import React from "react";
import { Link } from "react-router-dom";
import UpcomingGamesSection from "../components/UpcomingGamesSection";
import Hover3DCard from "../components/Hover3DCard";
import useScrollAnimation from "../hooks/useScrollAnimation";

// --- Importar os Assets ---
import videoHero from "../assets/videos/furia-video.mp4"; // Importa o vídeo
import imgNews1 from "../assets/images/news/news1.png"; // Importa as imagens das notícias
import imgNews2 from "../assets/images/news/news2.png";
import imgNews3 from "../assets/images/news/news3.png";
import imgCardFallen from "../assets/images/players/Fallen-Card.png"; // Importa os cards dos jogadores
import imgCardKscerato from "../assets/images/players/KScerato-card.png"; // Cuidado com maiúscula aqui se nome real for assim
import imgCardYuurih from "../assets/images/players/yuurih-card.png";
// --------------------------

import "./HomePage.css";

// Usar as variáveis importadas nos dados mock
const homePagePlayers = [
  { nickname: "FalleN", cardImageUrl: imgCardFallen },         // Usa a variável
  { nickname: "KSCERATO", cardImageUrl: imgCardKscerato },     // Usa a variável
  { nickname: "yuurih", cardImageUrl: imgCardYuurih },         // Usa a variável
];

const mockNews = [
  { id: 1, title: "Quem é Yekindar? novo integrante da Furia", imageUrl: imgNews1, link: "#", }, // Usa a variável
  { id: 2, title: "Análise Tática: O Domínio do FalleN", imageUrl: imgNews2, link: "#", },      // Usa a variável
  { id: 3, title: "Quem são essas panteras? conheça o time feminino", imageUrl: imgNews3, link: "#", }, // Usa a variável
];


const HomePage: React.FC = () => {
  // Hooks de animação (mantidos)
  const heroAnim = useScrollAnimation({ threshold: 0.2 });
  const nextMatchAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const lineupAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const newsAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const communityAnim = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section ref={heroAnim.ref} className={`hero-section ${heroAnim.isVisible ? "is-visible" : ""}`}>
        <video autoPlay loop muted playsInline className="hero-background-video">
           {/* Usa a variável importada no src */}
          <source src={videoHero} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          {/* Conteúdo do Hero mantido */}
          <h1 className="hero-title animate-slide-up">A ERA DA <span className="highlight">PANTERA</span></h1>
          <p className="hero-subtitle animate-slide-up delay-1">Acompanhe cada jogada, vibre com cada vitória. Bem-vindo ao lar da torcida FURIA.</p>
          <Link to="/proximos-jogos" className="hero-cta-button animate-slide-up delay-2">Ver Próximo Confronto</Link>
        </div>
      </section>

      {/* 2. Próximo Confronto (mantido, usa seu próprio componente) */}
      <section ref={nextMatchAnim.ref} className={`next-match-section ${ nextMatchAnim.isVisible ? "is-visible" : "" }`}>
        <div className="section-content animate-fade-in">
          <UpcomingGamesSection />
        </div>
      </section>

      {/* 3. Line-up Atual (mantido, usa as variáveis dos dados mock) */}
      <section ref={lineupAnim.ref} className={`lineup-section ${lineupAnim.isVisible ? "is-visible" : ""}`}>
        <div className="section-content animate-slide-up">
          <h2>LINE-UP <span className="highlight">CS2</span></h2>
          <div className="player-cards-preview">
            {homePagePlayers.map((player) => (
              <div key={player.nickname} className="player-card-wrapper">
                <Hover3DCard
                  imageUrl={player.cardImageUrl} // Já vem da variável importada
                  altText={`Card do jogador ${player.nickname}`}
                />
              </div>
            ))}
          </div>
          <Link to="/jogadores" className="see-more-link">Ver Line-up Completa</Link>
        </div>
      </section>

      {/* 4. Últimas Notícias/Destaques (mantido, usa as variáveis dos dados mock) */}
      <section ref={newsAnim.ref} className={`news-section ${newsAnim.isVisible ? "is-visible" : ""}`}>
        <div className="section-content animate-fade-in">
          <h2>DESTAQUES <span className="highlight">RECENTES</span></h2>
          <div className="news-grid">
            {mockNews.map((news) => (
              <a href={news.link} key={news.id} className="news-card">
                <img
                  src={news.imageUrl} // Já vem da variável importada
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

      {/* 5. Seção Comunidade (mantida) */}
      <section ref={communityAnim.ref} className={`community-section ${ communityAnim.isVisible ? "is-visible" : "" }`} >
        <div className="section-content animate-slide-up">
          <h2>JUNTE-SE À <span className="highlight">MATILHA</span></h2>
          <p>Converse com outros fãs, participe de discussões e não perca nenhuma novidade nas nossas redes!</p>
          <div className="community-links">
            <Link to="/chat" className="community-button chat">Entrar no Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;