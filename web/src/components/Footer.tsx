import React from 'react';
import { FaTwitter, FaInstagram, FaYoutube, FaTwitch, FaTelegramPlane, FaLink } from 'react-icons/fa';
import './Footer.css';

// Idealmente, importe ícones de uma biblioteca como react-icons
// Ex: import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'Twitter', href: 'https://twitter.com/furia', Icon: FaTwitter },
    { label: 'Instagram', href: 'https://www.instagram.com/furiagg', Icon: FaInstagram },
    { label: 'YouTube', href: 'https://www.youtube.com/@FURIAggCS', Icon: FaYoutube },
    { label: 'Twitch', href: 'https://www.twitch.tv/furiatv/', Icon: FaTwitch },
    { label: 'Telegram', href: 'https://t.me/FuriaCS2_bot', Icon: FaTelegramPlane },
    { label: 'Site Oficial', href: 'https://furia.gg', Icon: FaLink }, 
  ];

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="social-links">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label} // Importante para acessibilidade
              target="_blank" // Abrir em nova aba
              rel="noopener noreferrer" // Segurança
              title={label} // Tooltip opcional
            >
              <Icon /> {/* Renderiza o componente do ícone */}
            </a>
          ))}
        </div>
        <div className="copyright">
          © {currentYear} Portal do Fã FURIA - Feito com 🖤.
        </div>
      </div>
    </footer>
  );
};

export default Footer;