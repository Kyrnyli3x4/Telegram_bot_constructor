const TelegramBot = require('node-telegram-bot-api');

const token = 'ваш токен бота';
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
