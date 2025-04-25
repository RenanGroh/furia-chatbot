"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCuriosidadesActions = setupCuriosidadesActions;
const telegraf_1 = require("telegraf");
const curiosidades_1 = require("../commands/curiosidades");
function setupCuriosidadesActions(bot) {
    bot.action("nova_curiosidade", (ctx) => {
        var _a;
        ctx.answerCbQuery();
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const nova = (0, curiosidades_1.curiosidadePorUsuario)(userId);
        ctx.reply(`☝️🤓 Curiosidade FURIA:\n${nova}`, telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("🔁 Me manda outra", "nova_curiosidade"),
        ]));
    });
}
