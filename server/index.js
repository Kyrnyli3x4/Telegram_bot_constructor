const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let commands = [];

app.post('/add-command', (req, res) => {
    const { command } = req.body;
    commands.push({ command, response: '', buttons: [] });
    res.status(200).send({ success: true });
});

app.post('/add-response', (req, res) => {
    const { command, response, buttons } = req.body;
    const foundCommand = commands.find(cmd => cmd.command === command);
    if (foundCommand) {
        foundCommand.response = response;
        foundCommand.buttons = buttons;
        res.status(200).send({ success: true });
    } else {
        res.status(404).send({ success: false });
    }
});

app.post('/send-command', (req, res) => {
    const { command } = req.body;
    const foundCommand = commands.find(cmd => cmd.command === command);
    if (foundCommand) {
        res.status(200).send({ response: foundCommand.response, buttons: foundCommand.buttons });
    } else {
        res.status(404).send({ response: null });
    }
});

app.get('/generate-code', (req, res) => {
    res.status(200).send(`
const TelegramBot = require('node-telegram-bot-api');
const token = '1257970278:AAGAKNhGiMj47WlANtENrUM0DYV3hktRPfI';
const bot = new TelegramBot(token, { polling: true });

${commands.map(cmd => `
bot.onText(/${cmd.command.replace('/', '\\/')}/, (msg) => {
  const chatId = msg.chat.id;
  ${cmd.response ? `bot.sendMessage(chatId, '${cmd.response}'${cmd.buttons.length ? `, {
    reply_markup: {
      inline_keyboard: [${cmd.buttons.map(btn => `[{ text: '${btn.text}', callback_data: '${btn.command}' }]`).join(', ')}]
    }
  }` : ''});` : ''}
});`).join('\n')}

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  // Handle callback query here
});

console.log('Bot is running...');
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
