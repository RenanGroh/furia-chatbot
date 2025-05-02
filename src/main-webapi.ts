import dotenv from "dotenv";

// Carrega as variáveis de ambiente PRIMEIRO!
dotenv.config();

// Agora importe outros módulos que podem usar process.env
import "./infra/web-api/server"; // Ou o caminho correto

console.log("Ponto de entrada main-webapi.ts carregado e .env configurado.");
// Nenhuma outra configuração necessária aqui se server.ts faz app.listen
