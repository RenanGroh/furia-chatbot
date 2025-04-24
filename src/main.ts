import { Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((ctx) =>
  ctx.reply("Salve FURIOSO! 🐆 Bem-vindo seu bot exclusivo de CS2 da FURIA!")
);
bot.launch();

console.log("🤖 Bot rodando...");
