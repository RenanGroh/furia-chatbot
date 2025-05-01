import { Routes, Route } from 'react-router-dom'; // Importar Routes e Route
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
// Importar os componentes de PÁGINA
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PlayersPage from './pages/PlayersPage';
import UpcomingGamesPage from './pages/UpcomingGamesPage';
import TournamentsPage from './pages/TournamentsPage';
import AchievementsPage from './pages/AchievementsPage';
import WatchPage from './pages/WatchPage';
import './App.css';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    // Mensagem inicial do bot pode vir da API ou ser fixa aqui
    { id: 1, text: "Salve, torcedor da pantera! Manda a bala, o que você quer saber sobre a FURIA?", sender: 'bot'}
  ]);
  return (
    <div className="app-container">
      <Header />
      <Sidebar />

      <main className="main-content-area">
        {/* Definir as rotas aqui */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/chat"
            element={<ChatPage messages={messages} setMessages={setMessages} />}
          />
          <Route path="/jogadores" element={<PlayersPage />} />
          <Route path="/proximos-jogos" element={<UpcomingGamesPage />} />
          <Route path="/torneios" element={<TournamentsPage />} />
          <Route path="/conquistas" element={<AchievementsPage />} />
          <Route path="/assista" element={<WatchPage />} />
          {/* Adicionar uma rota "NotFound" opcional */}
          {/* <Route path="*" element={<h2>Página não encontrada!</h2>} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;