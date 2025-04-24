import { Context, Markup } from 'telegraf';

export function startCommand(ctx: Context) {
  ctx.reply(
    `👋 Salve FURIOSO! 🐆 Bem-vindo seu bot exclusivo de CS2 da FURIA!!

Eu sou seu contato oficial para tudo sobre o time de CS da FURIA!

📋 Aqui está o que você pode fazer:`,

    Markup.inlineKeyboard([
      [Markup.button.callback('📅 Próximo Jogo', 'proximo_jogo')],
      [Markup.button.callback('📢 Curiosidade FURIA', 'nova_curiosidade')],
      [Markup.button.callback('📈 Status da Equipe', 'jogadores')],
      [Markup.button.callback('📸 Mídia Oficial', 'midia')],
    ])
  );
}
