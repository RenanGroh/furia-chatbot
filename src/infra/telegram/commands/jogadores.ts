import { Context } from 'telegraf';
import { Markup } from 'telegraf';

export function jogadoresCommand(ctx: Context) {
  ctx.reply(
    '👥 Jogadores da FURIA:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 KSCERATO', 'stats_ks')],
      [Markup.button.callback('📊 yuurih', 'stats_yuurih')],
      [Markup.button.callback('📊 Yekindar', 'stats_yekindar')],
      [Markup.button.callback('📊 molodoy', 'stats_molodoy')],
      [Markup.button.callback('📊 FalleN', 'stats_fallen')]
    ])
  );
}
