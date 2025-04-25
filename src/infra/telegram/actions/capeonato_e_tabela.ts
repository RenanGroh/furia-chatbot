import { Context, Telegraf } from "telegraf";
import { campeonatoTabela } from "../commands/campeonato_e_tabela";

export function setupCampeonatoTabela(bot: Telegraf<any>) {
  bot.action("chamar_campeonato_e_tabela", (ctx: Context) => {
    campeonatoTabela(ctx); // Chama a função para mostrar os jogadores
  });
}
