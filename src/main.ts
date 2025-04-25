import "dotenv/config";
import { Context, Markup } from "telegraf";
import { bot } from "./infra/telegram/bot";
import { jogadoresCommand } from "./infra/telegram/commands/jogadores";
import { curiosidadeCommand } from "./infra/telegram/commands/curiosidades";
import { proximoJogoCommand } from "./infra/telegram/commands/proximojogo";
import { campeonatoTabela } from "./infra/telegram/commands/campeonato_e_tabela";

const timeout = 60 * 1000; // 1 minuto
let lastInteractionTime = Date.now(); // Marca o tempo da última interação

bot.action("chamar_jogadores", (ctx: Context) => {
  jogadoresCommand(ctx); // Chama a função para mostrar os jogadores
});

bot.action("chamar_campeonato_e_tabela", (ctx: Context) => {
  campeonatoTabela(ctx); // Chama a função para mostrar os jogadores
});

bot.action("chamar_curiosidade", (ctx: Context) => {
  curiosidadeCommand(ctx); // Chama a função para mostrar curiosidades
});

bot.action("chamar_proximojogo", (ctx: Context) => {
  proximoJogoCommand(ctx); // Chama a função para o proximo jogo
});

// Função de mídia oficial
bot.action("midia_oficial", (ctx: Context) => {
  if (Date.now() - lastInteractionTime > timeout) {
    ctx.reply("⏳ Interação expirou! Por favor, tente novamente.");
    return;
  }

  ctx.reply(
    "📸 Acompanhe a FURIA nas redes sociais:\n\n" +
      "- Instagram: https://instagram.com/furiagg\n" +
      "- Twitter: https://twitter.com/FURIA"
  );
  lastInteractionTime = Date.now();

  bot.action("site_oficial", (ctx: Context) => {
    if (Date.now() - lastInteractionTime > timeout) {
      ctx.reply("⏳ Interação expirou! Por favor, tente novamente.");
      return;
    }

    ctx.reply("Vista-se de forma FURIOSA!\n" + "https://www.furia.gg");
    lastInteractionTime = Date.now();
  });
});

// Inicia o bot
bot.launch();
console.log("🤖 Bot rodando...");
