"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jogadoresCommand = jogadoresCommand;
const telegraf_1 = require("telegraf");
function jogadoresCommand(ctx) {
    ctx.reply('🐯 Jogadores da FURIA:', telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('🇧🇷 KSCERATO', 'stats_ks')],
        [telegraf_1.Markup.button.callback('🇧🇷 yuurih', 'stats_yuurih')],
        [telegraf_1.Markup.button.callback('🇱🇻 Yekindar', 'stats_yekindar')],
        [telegraf_1.Markup.button.callback('🇰🇿 molodoy', 'stats_molodoy')],
        [telegraf_1.Markup.button.callback('🇧🇷 FalleN', 'stats_fallen')]
    ]));
}
