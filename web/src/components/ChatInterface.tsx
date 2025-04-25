import React from 'react';
import './ChatInterface.css'; // Criaremos este CSS

const ChatInterface: React.FC = () => {
  return (
    <div className="chat-interface">
      <div className="message-list">
        {/* Mensagens aparecerão aqui */}
        <p style={{ textAlign: 'center', color: '#aaa' }}>Área do Chat</p>
      </div>
      <div className="message-input">
        <input type="text" placeholder="Digite sua mensagem..." />
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default ChatInterface;