"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bot_1 = require("./infra/telegram/bot");
// Comandos
const jogadores_1 = require("./infra/telegram/commands/jogadores");
const curiosidades_1 = require("./infra/telegram/commands/curiosidades");
const proximojogo_1 = require("./infra/telegram/commands/proximojogo");
const campeonato_e_tabela_1 = require("./infra/telegram/commands/campeonato_e_tabela");
const start_1 = require("./infra/telegram/commands/start");
// Ações (inline buttons)
const stats_1 = require("./infra/telegram/actions/stats");
const curiosidades_2 = require("./infra/telegram/actions/curiosidades");
const midia_1 = require("./infra/telegram/actions/midia");
const loja_1 = require("./infra/telegram/actions/loja");
const capeonato_e_tabela_1 = require("./infra/telegram/actions/capeonato_e_tabela");
// start
bot_1.bot.start(start_1.startCommand);
// Actions do menu
bot_1.bot.action("chamar_curiosidade", curiosidades_1.curiosidadeCommand);
bot_1.bot.action("chamar_jogadores", jogadores_1.jogadoresCommand);
bot_1.bot.action("chamar_proximojogo", proximojogo_1.proximoJogoCommand);
bot_1.bot.action("chamar_campeonato_e_tabela", campeonato_e_tabela_1.campeonatoTabela);
// Modularização das ações
(0, stats_1.setupStatsActions)(bot_1.bot);
(0, curiosidades_2.setupCuriosidadesActions)(bot_1.bot);
(0, midia_1.setupMidiaActions)(bot_1.bot);
(0, loja_1.setupLojaActions)(bot_1.bot);
(0, capeonato_e_tabela_1.setupCampeonatoTabela)(bot_1.bot);
// Inicia o bot
bot_1.bot.launch();
console.log("🤖 Bot rodando...");
