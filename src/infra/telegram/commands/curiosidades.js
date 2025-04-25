"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curiosidadePorUsuario = void 0;
exports.curiosidadeCommand = curiosidadeCommand;
const telegraf_1 = require("telegraf");
const curiosidades = [
    "🐆 A FURIA foi fundada em 2017 e rapidamente se tornou um dos maiores times do Brasil.",
    "🎯 KSCERATO é um dos jogadores com maior KD (kill/death ratio) da América do Sul.",
    "🧠 A FURIA investe pesado em psicologia e performance dos jogadores.",
    "🌎 O time já participou de Majors nos EUA, Europa e Ásia.",
    "👊 O estilo agressivo da FURIA é uma das marcas registradas do time.",
    "🎯 Fallen é lenda viva do CS e sua habilidade com a AWP é reconhecida mundialmente."
];
// 🔒 Mapeia usuários para um array de índices já enviados
const historicoDeCuriosidades = {};
function getCuriosidadeParaUsuario(userId) {
    if (!historicoDeCuriosidades[userId]) {
        historicoDeCuriosidades[userId] = [];
    }
    const historico = historicoDeCuriosidades[userId];
    if (historico.length === curiosidades.length) {
        historicoDeCuriosidades[userId] = [];
    }
    const atualizado = historicoDeCuriosidades[userId];
    const disponiveis = curiosidades
        .map((_, i) => i)
        .filter((i) => !atualizado.includes(i));
    const escolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    atualizado.push(escolhido);
    return curiosidades[escolhido];
}
function curiosidadeCommand(ctx) {
    var _a;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    const curiosidade = getCuriosidadeParaUsuario(userId);
    ctx.reply(`☝️🤓 Curiosidade FURIA:\n${curiosidade}`, telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback("🔁 Me manda outra", "nova_curiosidade"),
    ]));
}
// Exporta para ser usado na action também
exports.curiosidadePorUsuario = getCuriosidadeParaUsuario;
