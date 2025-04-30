"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ChatInterface_1 = __importDefault(require("../components/ChatInterface")); // Ajuste o caminho se necessário
const ChatPage = () => {
    // O componente ChatInterface já está dentro de uma section implicitamente
    // pelo CSS do .main-content-area section. Se quiser um container
    // específico pode adicionar <section>...</section> aqui.
    return <ChatInterface_1.default />;
};
exports.default = ChatPage;
