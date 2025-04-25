import React from 'react';
import './Footer.css'; // Criaremos este CSS

// Idealmente, importe ícones de uma biblioteca como react-icons
// Ex: import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="social-links">
          {/* Substitua '#' pelos links reais e adicione ícones se desejar */}
          <a href="#" aria-label="Twitter"> T </a> {/* Placeholder para Ícone */}
          <a href="#" aria-label="Instagram"> I </a> {/* Placeholder para Ícone */}
          <a href="#" aria-label="Youtube"> Y </a> {/* Placeholder para Ícone */}
          {/* Adicione outras redes */}
        </div>
        <div className="copyright">
          © {currentYear} Renan Groh / Challenge #1 - Feito por um fã da FURIA.
        </div>
      </div>
    </footer>
  );
};

export default Footer;