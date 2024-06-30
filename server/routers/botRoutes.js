const express = require('express');
const {
    getCommands,
    addCommand,
    updateCommand,
    deleteCommand,
    handleChatCommand,
    getButtons,
    addButton,
    deleteButton
} = require('../controllers/botController');
const router = express.Router();

router.get('/commands', getCommands);
router.post('/commands', addCommand);
router.put('/commands/:command', updateCommand);
router.delete('/commands/:command', deleteCommand);
router.post('/chat-command', handleChatCommand);

router.get('/buttons', getButtons);
router.post('/buttons', addButton);
router.delete('/buttons/:index', deleteButton);

module.exports = router;
