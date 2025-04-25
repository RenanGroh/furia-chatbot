"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLojaActions = setupLojaActions;
let lastInteractionTime = Date.now();
const timeout = 10 * 1000;
const userInteractionMap = new Map();
setInterval(() => {
    const now = Date.now();
    for (const [userId, time] of userInteractionMap.entries()) {
        if (now - time > timeout * 5) {
            userInteractionMap.delete(userId);
        }
    }
}, 10 * 60 * 1000); // a cada 10 min
function setupLojaActions(bot) {
    bot.action("site_oficial", (ctx) => {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const now = Date.now();
        const lastTime = userInteractionMap.get(userId) || 0;
        if (now - lastTime < timeout) {
            ctx.reply("⏳ Interação expirou! Por favor, tente novamente em instantes.");
            return;
        }
        userInteractionMap.set(userId, now);
        ctx.reply("Vista-se de forma FURIOSA!\n" + "https://www.furia.gg");
    });
}
