"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCampeonatoTabela = setupCampeonatoTabela;
const campeonato_e_tabela_1 = require("../commands/campeonato_e_tabela");
function setupCampeonatoTabela(bot) {
    bot.action("chamar_campeonato_e_tabela", (ctx) => {
        (0, campeonato_e_tabela_1.campeonatoTabela)(ctx); // Chama a função para mostrar os jogadores
    });
}
