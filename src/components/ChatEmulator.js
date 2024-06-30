import React, { useState, useContext } from 'react';
import { BotContext } from '../context/BotContext';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';

const ChatEmulator = () => {
    const { state } = useContext(BotContext);
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);

    const handleSendCommand = async () => {
        if (input.trim() !== '') {
            setChat([...chat, { sender: 'user', message: input }]);
            try {
                const response = await axios.post('http://localhost:3001/send-command', { command: input });
                if (response.data.response) {
                    setChat([...chat, { sender: 'bot', message: response.data.response, buttons: response.data.buttons }]);
                }
            } catch (error) {
                console.error(error);
            }
            setInput('');
        }
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>Chat Emulator</Typography>
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
                {chat.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <Typography variant="body1" style={{ display: 'inline-block', margin: '5px 0' }}>
                            {msg.message}
                        </Typography>
                        {msg.buttons && msg.buttons.map((btn, btnIndex) => (
                            <Button key={btnIndex} variant="contained" style={{ marginLeft: '5px' }}>{btn.text}</Button>
                        ))}
                    </div>
                ))}
            </div>
            <TextField
                label="Command"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSendCommand} fullWidth>
                Send
            </Button>
        </Paper>
    );
};

export default ChatEmulator;
