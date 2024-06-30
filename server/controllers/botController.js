const bot = require('../config/botConfig');

let commands = [];
let buttons = [];

const handleMessage = (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    const command = commands.find(cmd => cmd.command === text);

    if (command) {
        if (command.response) {
            const boundButtons = buttons.filter(btn => btn.message === text && btn.type === 'inline');
            const options = boundButtons.length > 0 ? {
                reply_markup: {
                    inline_keyboard: [boundButtons.map(btn => ({ text: btn.label, callback_data: btn.action }))]
                }
            } : {};

            bot.sendMessage(chatId, command.response, options);
        } else {
            bot.sendMessage(chatId, 'Команда найдена, но ответа нет.');
        }
    } else {
        bot.sendMessage(chatId, 'Команда не найдена.');
    }
};

bot.on('message', handleMessage);

const getCommands = (req, res) => {
    res.json(commands);
};

const addCommand = (req, res) => {
    const { command, response } = req.body;
    commands.push({ command, response });
    res.json({ message: 'Команда добавлена' });
};

const updateCommand = (req, res) => {
    const { command } = req.params;
    const { response } = req.body;
    const cmdIndex = commands.findIndex(cmd => cmd.command === command);
    if (cmdIndex > -1) {
        commands[cmdIndex].response = response;
        res.json({ message: 'Команда обновлена' });
    } else {
        res.status(404).json({ message: 'Команда не найдена' });
    }
};

const deleteCommand = (req, res) => {
    const { command } = req.params;
    commands = commands.filter(cmd => cmd.command !== command);
    res.json({ message: 'Команда удалена' });
};

const handleChatCommand = (req, res) => {
    const { command } = req.body;
    const foundCommand = commands.find(cmd => cmd.command === command);

    if (foundCommand) {
        res.json({ message: foundCommand.response || 'Команда найдена, но ответа нет.' });
    } else {
        res.json({ message: 'Команда не найдена.' });
    }
};

const getButtons = (req, res) => {
    res.json(buttons);
};

const addButton = (req, res) => {
    const { label, action, type, message } = req.body;
    buttons.push({ label, action, type, message });
    res.json({ message: 'Кнопка добавлена' });
};

const deleteButton = (req, res) => {
    const { index } = req.params;
    buttons.splice(index, 1);
    res.json({ message: 'Кнопка удалена' });
};

module.exports = {
    getCommands,
    addCommand,
    updateCommand,
    deleteCommand,
    handleChatCommand,
    getButtons,
    addButton,
    deleteButton
};
