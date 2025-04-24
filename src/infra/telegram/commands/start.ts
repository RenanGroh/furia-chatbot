import { Context, Markup } from 'telegraf';

export function startCommand(ctx: Context) {
  ctx.reply(
    `👋 Salve FURIOSO! 🐆 Bem-vindo ao seu bot exclusivo de CS2 da FURIA!!

Eu sou seu contato oficial para tudo sobre o time de CS da FURIA!

📋 Aqui está o que você pode fazer:`,

    Markup.inlineKeyboard([
      [Markup.button.callback('📅 Próximo Jogo', 'chamar_proximojogo')],
      [Markup.button.callback('📢 Curiosidade FURIA', 'nova_curiosidade')],
      [Markup.button.callback('🎮 Jogadores', 'chamar_jogadores')],
      [Markup.button.callback('📸 Mídia Oficial', 'midia_oficial')],
    ])
  );
}
