"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan = void 0;
class Fan {
    constructor(id, name, favoritePlayer) {
        this.id = id;
        this.name = name;
        this.favoritePlayer = favoritePlayer;
    }
    static fromTelegram(user) {
        return new Fan(user.id, user.first_name);
    }
}
exports.Fan = Fan;
