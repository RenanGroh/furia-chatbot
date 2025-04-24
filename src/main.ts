import 'dotenv/config';
import { Context, Markup } from 'telegraf';
import { bot } from './infra/telegram/bot';
import { jogadoresCommand } from './infra/telegram/commands/jogadores';
import { curiosidadeCommand } from './infra/telegram/commands/curiosidades';
import { proximoJogoCommand } from './infra/telegram/commands/proximojogo';

const timeout = 60 * 1000; // 1 minuto
let lastInteractionTime = Date.now(); // Marca o tempo da última interação

// Função de comando "/start"
bot.start((ctx: Context) => {
  ctx.reply(
    `👋 Salve FURIOSO! 🐆 Bem-vindo ao seu bot exclusivo de CS2 da FURIA!!

Eu sou seu contato oficial para tudo sobre o time de CS da FURIA!

📋 Aqui está o que você pode fazer:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📅 Próximo Jogo', 'chamar_proximojogo')],
      [Markup.button.callback('🤓👆Curiosidade FURIA', 'chamar_curiosidade')],
      [Markup.button.callback('🐯 Jogadores', 'chamar_jogadores')],
      [Markup.button.callback('📸 Mídia Oficial', 'midia_oficial')],
    ])
  );
});

bot.action('chamar_jogadores', (ctx: Context) => {
    jogadoresCommand(ctx);  // Chama a função para mostrar os jogadores
  });

bot.action('chamar_curiosidade', (ctx: Context) => {
    curiosidadeCommand(ctx);  // Chama a função para mostrar os jogadores
});

bot.action('chamar_proximojogo', (ctx: Context) => {
    proximoJogoCommand(ctx);  // Chama a função para mostrar os jogadores
});

// Função de mídia oficial
bot.action('midia_oficial', (ctx: Context) => {
  if (Date.now() - lastInteractionTime > timeout) {
    ctx.reply("⏳ Interação expirou! Por favor, tente novamente.");
    return;
  }

  ctx.reply(
    '📸 Acompanhe a FURIA nas redes sociais:\n\n' +
    '- Instagram: https://instagram.com/furiagg\n' +
    '- Twitter: https://twitter.com/FURIA'
  );
  lastInteractionTime = Date.now(); // Atualiza o tempo da última interação
});

// Inicia o bot
bot.launch();
console.log('🤖 Bot rodando...');

