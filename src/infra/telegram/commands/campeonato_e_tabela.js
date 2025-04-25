"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campeonatoTabela = campeonatoTabela;
function campeonatoTabela(ctx) {
    ctx.reply(`📍 Torneio: ESL Pro League
    
        -- PLAY-IN --
  
    `);
    ctx.replyWithPhoto({
        source: "src/assets/images/tabela-play-in.png",
    }, { caption: "🏆 Tabela do campeonato atualizada!" });
}
