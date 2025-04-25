"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCommand = startCommand;
const telegraf_1 = require("telegraf");
function startCommand(ctx) {
    ctx.reply(`👋 Salve FURIOSO! 🐆 Bem-vindo ao seu bot exclusivo de CS2 da FURIA!!

Eu sou seu contato oficial para tudo sobre o time de CS da FURIA!

📋 Aqui está o que você pode fazer:`, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("📅 Próximo Jogo", "chamar_proximojogo")],
        [telegraf_1.Markup.button.callback("📅 Campeonato atual e Tabela", "chamar_campeonato_e_tabela")],
        [telegraf_1.Markup.button.callback("☝️🤓 Curiosidade FURIA", "nova_curiosidade")],
        [telegraf_1.Markup.button.callback("🐯 Jogadores", "chamar_jogadores")],
        [telegraf_1.Markup.button.callback("📸 Mídia Oficial", "midia_oficial")],
        [telegraf_1.Markup.button.callback("🔥 Vista o estilo FURIA!", "site_oficial")],
    ]));
}
