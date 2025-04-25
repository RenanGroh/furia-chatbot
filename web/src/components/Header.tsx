import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    // A classe 'app-header' agora terá position fixed no CSS
    <header className="app-header">
      {/* Container para agrupar logo e título */}
      <div className="header-left-section">
        <img src="src/assets/images/furia-logo.png" alt="FURIA Logo" className="furia-logo" />
        <div className="header-title-container">
          <h1>Furia Counter Strike 2</h1>
        </div>
      </div>

      {/* Container das ações (já estava separado) */}
      <div className="header-actions">
        <a
          href="https://furia.gg/"
          target="_blank"
          rel="noopener noreferrer"
          className="store-link"
        >
          Loja Oficial
        </a>
      </div>
    </header>
  );
};

export default Header;