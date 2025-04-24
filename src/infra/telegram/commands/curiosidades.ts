import { Context, Markup } from 'telegraf';

const curiosidades = [
  '🐆 A FURIA foi fundada em 2017 e rapidamente se tornou um dos maiores times do Brasil.',
  '🎯 KSCERATO é um dos jogadores com maior KD (kill/death ratio) da América do Sul.',
  '🧠 A FURIA investe pesado em psicologia e performance dos jogadores.',
  '🌎 O time já participou de Majors nos EUA, Europa e Ásia.',
  '👊 O estilo agressivo da FURIA é uma das marcas registradas do time, especialmente com o arT como IGL.'
];

// 🔒 Mapeia usuários para um array de índices já enviados
const historicoDeCuriosidades: Record<number, number[]> = {};

function getCuriosidadeParaUsuario(userId: number): string {
    if (!historicoDeCuriosidades[userId]) {
      historicoDeCuriosidades[userId] = [];
    }
  
    const historico = historicoDeCuriosidades[userId];
  
    if (historico.length === curiosidades.length) {
      historicoDeCuriosidades[userId] = [];
    }
  
    const atualizado = historicoDeCuriosidades[userId];
  
    const disponiveis = curiosidades
      .map((_, i) => i)
      .filter((i) => !atualizado.includes(i));
  
    const escolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    atualizado.push(escolhido);
  
    return curiosidades[escolhido];
  }

export function curiosidadeCommand(ctx: Context) {
  const userId = ctx.from?.id!;
  const curiosidade = getCuriosidadeParaUsuario(userId);

  ctx.reply(
    `🤓👆 Curiosidade FURIA:\n${curiosidade}`,
    Markup.inlineKeyboard([
      Markup.button.callback('🔁 Me manda outra', 'nova_curiosidade')
    ])
  );
}

// Exporta para ser usado na action também
export const curiosidadePorUsuario = getCuriosidadeParaUsuario;
