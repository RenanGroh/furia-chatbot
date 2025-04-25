import "dotenv/config";
import { bot } from "./infra/telegram/bot";

// Comandos
import { jogadoresCommand } from "./infra/telegram/commands/jogadores";
import { curiosidadeCommand } from "./infra/telegram/commands/curiosidades";
import { proximoJogoCommand } from "./infra/telegram/commands/proximojogo";
import { campeonatoTabela } from "./infra/telegram/commands/campeonato_e_tabela";
import { startCommand } from "./infra/telegram/commands/start";

// Ações (inline buttons)
import { setupStatsActions } from "./infra/telegram/actions/stats";
import { setupCuriosidadesActions } from "./infra/telegram/actions/curiosidades";
import { setupMidiaActions } from "./infra/telegram/actions/midia";
import { setupLojaActions } from "./infra/telegram/actions/loja";
import { setupCampeonatoTabela } from "./infra/telegram/actions/capeonato_e_tabela";




// start
bot.start(startCommand);

// Actions do menu
bot.action("chamar_curiosidade", curiosidadeCommand);
bot.action("chamar_jogadores", jogadoresCommand);
bot.action("chamar_proximojogo", proximoJogoCommand);
bot.action("chamar_campeonato_e_tabela", campeonatoTabela);

// Modularização das ações
setupStatsActions(bot);
setupCuriosidadesActions(bot);
setupMidiaActions(bot);
setupLojaActions(bot);
setupCampeonatoTabela(bot);

// Inicia o bot
bot.launch();
console.log("🤖 Bot rodando...");
