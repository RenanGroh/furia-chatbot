"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import React from 'react';
const react_router_dom_1 = require("react-router-dom"); // Importar Routes e Route
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
// Importar os componentes de PÁGINA
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const ChatPage_1 = __importDefault(require("./pages/ChatPage"));
const PlayersPage_1 = __importDefault(require("./pages/PlayersPage"));
const UpcomingGamesPage_1 = __importDefault(require("./pages/UpcomingGamesPage"));
const TournamentsPage_1 = __importDefault(require("./pages/TournamentsPage"));
const AchievementsPage_1 = __importDefault(require("./pages/AchievementsPage"));
const WatchPage_1 = __importDefault(require("./pages/WatchPage"));
require("./App.css");
function App() {
    return (<div className="app-container">
      <Header_1.default />
      <Sidebar_1.default />

      <main className="main-content-area">
        {/* Definir as rotas aqui */}
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<HomePage_1.default />}/>
          <react_router_dom_1.Route path="/chat" element={<ChatPage_1.default />}/>
          <react_router_dom_1.Route path="/jogadores" element={<PlayersPage_1.default />}/>
          <react_router_dom_1.Route path="/proximos-jogos" element={<UpcomingGamesPage_1.default />}/>
          <react_router_dom_1.Route path="/torneios" element={<TournamentsPage_1.default />}/>
          <react_router_dom_1.Route path="/conquistas" element={<AchievementsPage_1.default />}/>
          <react_router_dom_1.Route path="/assista" element={<WatchPage_1.default />}/>
          {/* Adicionar uma rota "NotFound" opcional */}
          {/* <Route path="*" element={<h2>Página não encontrada!</h2>} /> */}
        </react_router_dom_1.Routes>
      </main>

      <Footer_1.default />
    </div>);
}
exports.default = App;
