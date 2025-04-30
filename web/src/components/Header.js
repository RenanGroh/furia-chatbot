"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Header.css");
const Header = () => {
    return (
    // A classe 'app-header' agora terá position fixed no CSS
    <header className="app-header">
      {/* Container para agrupar logo e título */}
      <div className="header-left-section">
        <img src="src/assets/images/furia-logo.png" alt="FURIA Logo" className="furia-logo"/>
        <div className="header-title-container">
          <h1>Furia Counter Strike 2</h1>
        </div>
      </div>

      {/* Container das ações (já estava separado) */}
      <div className="header-actions">
        <a href="https://furia.gg/" target="_blank" rel="noopener noreferrer" className="store-link">
          Loja Oficial
        </a>
      </div>
    </header>);
};
exports.default = Header;
