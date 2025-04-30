// web/src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css'; // Precisaremos atualizar este CSS

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    // Mensagem inicial do bot pode vir da API ou ser fixa aqui
     { id: 1, text: "Salve, torcedor da pantera! Manda a bala, o que você quer saber sobre a FURIA?", sender: 'bot'}
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Para scroll automático

  // Efeito para rolar para baixo quando novas mensagens chegam
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Adiciona a mensagem do usuário otimisticamente
    const userMessage: Message = {
      id: Date.now(), // ID simples baseado no timestamp
      text: trimmedInput,
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue(''); // Limpa o input
    setIsLoading(true); // Mostra indicador de carregamento

    try {
      // Chama a sua API backend
      const response = await fetch('http://localhost:3001/api/chat/send-message', { // Use a porta correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }), // Envia a mensagem no corpo
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o chatbot backend');
      }

      const data = await response.json();

      // Adiciona a resposta do bot
      const botMessage: Message = {
        id: Date.now() + 1, // ID ligeiramente diferente
        text: data.reply || "Desculpe, não consegui processar sua pergunta.",
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Adiciona uma mensagem de erro no chat
       const errorMessage: Message = {
         id: Date.now() + 1,
         text: "Ops! Tive um problema para conectar. Tente novamente mais tarde.",
         sender: 'bot',
       };
       setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false); // Esconde indicador de carregamento
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    // Use <section> se este componente não estiver dentro de uma Page que já use
    <section className="chat-section-container">
         <h2>Chat da Torcida FURIA</h2>
         <div className="chat-interface">
             <div className="message-list">
                 {messages.map((msg) => (
                     <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                         <p>{msg.text}</p>
                     </div>
                 ))}
                 {/* Indicador de carregamento / "digitando..." */}
                 {isLoading && (
                    <div className="message-bubble bot typing-indicator">
                       <p><span>.</span><span>.</span><span>.</span></p>
                    </div>
                 )}
                 {/* Elemento invisível para ajudar no scroll */}
                 <div ref={messagesEndRef} />
             </div>
             <div className="message-input">
                 <input
                    type="text"
                    placeholder="Pergunte algo sobre a FURIA..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                 <button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                     {isLoading ? 'Pensando...' : 'Enviar'}
                 </button>
             </div>
          </div>
    </section>
  );
};

export default ChatInterface;