"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./WatchPage.css"); // Criaremos este CSS
const WatchPage = () => {
    // Use um link de embed genérico ou o da transmissão atual se tiver API
    const youtubeEmbedUrl = "https://www.youtube.com/embed/DLzxrzFCyOs?hl=en_US&version=3&rel=0&autoplay=1"; // Exemplo: Canal oficial da FURIA, pode não ser um live direto
    //https://www.youtube.com/embed/live_stream?channel=UC4_3-R8Bol7yNWQDXILkEsg
    //
    return (<section className="watch-page">
      <h2>Assista Ao Vivo</h2>
      <p>Acompanhe a transmissão da FURIA!</p>
      <div className="video-container">
        <iframe src={youtubeEmbedUrl} title="Transmissão FURIA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <p style={{ marginTop: '15px' }}>
         <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer">Assistir na Twitch</a>
         {' | '}
         <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Assistir no YouTube</a>
       </p>
    </section>);
};
exports.default = WatchPage;
