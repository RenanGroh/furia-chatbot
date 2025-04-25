import React from 'react';
import ChatInterface from '../components/ChatInterface'; // Ajuste o caminho se necessário

const ChatPage: React.FC = () => {
  // O componente ChatInterface já está dentro de uma section implicitamente
  // pelo CSS do .main-content-area section. Se quiser um container
  // específico pode adicionar <section>...</section> aqui.
  return <ChatInterface />;
};
export default ChatPage;