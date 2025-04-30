"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// Importar NavLink em vez de Link (ou Link se não quiser estilo ativo)
const react_router_dom_1 = require("react-router-dom");
require("./Sidebar.css");
const Sidebar = () => {
    // Estrutura para facilitar a criação dos links
    const menuItems = [
        { path: '/', label: 'Inicio' },
        { path: '/chat', label: 'Chat' },
        { path: '/jogadores', label: 'Jogadores' },
        { path: '/proximos-jogos', label: 'Proximos jogos' },
        { path: '/torneios', label: 'Torneios' },
        { path: '/conquistas', label: 'Conquistas' },
        { path: '/assista', label: 'Assista' },
    ];
    return (<aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (<li key={item.path}>
              {/* Usar NavLink */}
              <react_router_dom_1.NavLink to={item.path} 
        // A classe 'active' será adicionada automaticamente pelo NavLink
        // O CSS em Sidebar.css já tem o estilo para .active
        // end prop é importante para a rota "/" não ficar ativa sempre
        end={item.path === '/'}>
                {item.label}
              </react_router_dom_1.NavLink>
            </li>))}
        </ul>
      </nav>
    </aside>);
};
exports.default = Sidebar;
