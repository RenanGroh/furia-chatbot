import { Context } from "telegraf";
import { Markup } from "telegraf";

export function campeonatoTabela(ctx: Context) {
  ctx.reply(
    `📍 Torneio: ESL Pro League
    
        -- PLAY-IN --
  
    `
  );
  ctx.replyWithPhoto(
    {
      source: "src/assets/images/tabela-play-in.png",
    },
    { caption: "🏆 Tabela do campeonato atualizada!" }
  );
}
