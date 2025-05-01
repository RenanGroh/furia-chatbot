import React from 'react';
import ChatInterface from '../components/ChatInterface'; // Ajuste o caminho se necessário

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// Defina as props que ChatPage recebe
interface ChatPageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatPage: React.FC<ChatPageProps> = ({ messages, setMessages }) => { // Recebe as props
  // Passa as props para ChatInterface
  return <ChatInterface messages={messages} setMessages={setMessages} />;
};
export default ChatPage;