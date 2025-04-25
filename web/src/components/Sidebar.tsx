import React from 'react';
// Importar NavLink em vez de Link (ou Link se não quiser estilo ativo)
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
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

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              {/* Usar NavLink */}
              <NavLink
                to={item.path}
                // A classe 'active' será adicionada automaticamente pelo NavLink
                // O CSS em Sidebar.css já tem o estilo para .active
                // end prop é importante para a rota "/" não ficar ativa sempre
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;