import { Telegraf, Markup } from "telegraf";
import { curiosidadePorUsuario } from "../commands/curiosidades";

export function setupCuriosidadesActions(bot: Telegraf<any>) {
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
}
