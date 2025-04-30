"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// web/src/components/ChatInterface.tsx
const react_1 = __importStar(require("react"));
require("./ChatInterface.css"); // Precisaremos atualizar este CSS
const ChatInterface = () => {
    const [messages, setMessages] = (0, react_1.useState)([
        // Mensagem inicial do bot pode vir da API ou ser fixa aqui
        { id: 1, text: "Salve, torcedor da pantera! Manda a bala, o que você quer saber sobre a FURIA?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const messagesEndRef = (0, react_1.useRef)(null); // Para scroll automático
    // Efeito para rolar para baixo quando novas mensagens chegam
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleSendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading)
            return;
        // Adiciona a mensagem do usuário otimisticamente
        const userMessage = {
            id: Date.now(), // ID simples baseado no timestamp
            text: trimmedInput,
            sender: 'user',
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue(''); // Limpa o input
        setIsLoading(true); // Mostra indicador de carregamento
        try {
            // Chama a sua API backend
            const response = yield fetch('http://localhost:3001/api/chat/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: trimmedInput }), // Envia a mensagem no corpo
            });
            if (!response.ok) {
                throw new Error('Falha ao conectar com o chatbot backend');
            }
            const data = yield response.json();
            // Adiciona a resposta do bot
            const botMessage = {
                id: Date.now() + 1, // ID ligeiramente diferente
                text: data.reply || "Desculpe, não consegui processar sua pergunta.",
                sender: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }
        catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            // Adiciona uma mensagem de erro no chat
            const errorMessage = {
                id: Date.now() + 1,
                text: "Ops! Tive um problema para conectar. Tente novamente mais tarde.",
                sender: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
        finally {
            setIsLoading(false); // Esconde indicador de carregamento
        }
    });
    const handleKeyPress = (event) => {
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
                 {messages.map((msg) => (<div key={msg.id} className={`message-bubble ${msg.sender}`}>
                         <p>{msg.text}</p>
                     </div>))}
                 {/* Indicador de carregamento / "digitando..." */}
                 {isLoading && (<div className="message-bubble bot typing-indicator">
                       <p><span>.</span><span>.</span><span>.</span></p>
                    </div>)}
                 {/* Elemento invisível para ajudar no scroll */}
                 <div ref={messagesEndRef}/>
             </div>
             <div className="message-input">
                 <input type="text" placeholder="Pergunte algo sobre a FURIA..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} disabled={isLoading}/>
                 <button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                     {isLoading ? 'Pensando...' : 'Enviar'}
                 </button>
             </div>
          </div>
    </section>);
};
exports.default = ChatInterface;
