import { Markup, Telegraf } from "telegraf";
import { startCommand } from "./commands/start";
import { jogadoresCommand } from "./commands/jogadores";
import { proximoJogoCommand } from "./commands/proximojogo";
import {
  curiosidadeCommand,
  curiosidadePorUsuario,
} from "./commands/curiosidades";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(startCommand);
//Actions
bot.action("stats_ks", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 KSCERATO: Rating 1.14 | KD 1.21 | Função: Rifler");
});

bot.action("stats_yuurih", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 yuurih: Rating 1.13 | KD 1.19 | Função: Rifler");
});

bot.action("stats_yekindar", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 Yekindar: Rating 1.05 | KD 1.02 | Função: IGL / Entry");
});

bot.action("stats_molodoy", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 molodoy: Rating 1.09 | KD 1.10 | Função: Support");
});

bot.action("stats_fallen", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 FalleN: Rating 1.08 | KD 1.07 | Função: AWP / IGL");
});

// Botão “Me manda outra”
bot.action("nova_curiosidade", (ctx) => {
  ctx.answerCbQuery();
  const userId = ctx.from?.id!;
  const nova = curiosidadePorUsuario(userId);

  ctx.reply(
    `☝️🤓 Curiosidade FURIA:\n${nova}`,
    Markup.inlineKeyboard([
      Markup.button.callback("🔁 Me manda outra", "nova_curiosidade"),
    ])
  );
});

export { bot };
