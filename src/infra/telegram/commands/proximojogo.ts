import { Context } from 'telegraf';
import { Markup } from 'telegraf';

export function proximoJogoCommand(ctx: Context) {
  const title = encodeURIComponent('FURIA vs Team Liquid - ESL Pro League');
  const details = encodeURIComponent('Não perca o próximo jogo da FURIA! #GoFURIA');
  const location = encodeURIComponent('Online');
  const start = '20250427T210000Z'; // 27 de abril, 18h BRT = 21h UTC
  const end = '20250427T220000Z';   // duração estimada: 1h
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  ctx.reply(
    `📅 Próximo jogo da FURIA:

🆚 FURIA vs Team Liquid  
📍 Torneio: ESL Pro League  
🕖 Data: 27 de abril, às 18:00h (horário de Brasília)

🔥 Não perca! #GoFURIA`,
    Markup.inlineKeyboard([
      Markup.button.url('➕ Adicionar ao Calendário', googleCalendarUrl)
    ])
  );
}
