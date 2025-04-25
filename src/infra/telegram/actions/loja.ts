import { Telegraf, Context } from "telegraf";

let lastInteractionTime = Date.now();
const timeout = 10 * 1000;
const userInteractionMap = new Map<number, number>();

setInterval(() => {
  const now = Date.now();
  for (const [userId, time] of userInteractionMap.entries()) {
    if (now - time > timeout * 5) {
      userInteractionMap.delete(userId);
    }
  }
}, 10 * 60 * 1000); // a cada 10 min

export function setupLojaActions(bot: Telegraf<any>) {
  bot.action("site_oficial", (ctx: Context) => {
    const userId = ctx.from?.id!;
    const now = Date.now();
    const lastTime = userInteractionMap.get(userId) || 0;
  
    if (now - lastTime < timeout) {
      ctx.reply("⏳ Interação expirou! Por favor, tente novamente em instantes.");
      return;
    }
  
    userInteractionMap.set(userId, now);
  
    ctx.reply("Vista-se de forma FURIOSA!\n" + "https://www.furia.gg");
  });
}
