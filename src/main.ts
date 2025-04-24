import 'dotenv/config';
import { bot } from './infra/telegram/bot';

bot.launch();
console.log('🤖 Bot rodando...');
