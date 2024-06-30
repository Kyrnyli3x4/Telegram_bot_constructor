import React, { useContext, useState } from 'react';
import { BotContext } from '../context/BotContext';
import axios from 'axios';
import { TextField, Button, Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ResponseEditor = () => {
    const { state, dispatch } = useContext(BotContext);
    const [selectedCommand, setSelectedCommand] = useState('');
    const [response, setResponse] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [buttonCommand, setButtonCommand] = useState('');
    const [buttons, setButtons] = useState([]);

    const handleSaveResponse = async () => {
        if (selectedCommand && response.trim() !== '') {
            const payload = {
                command: selectedCommand,
                response,
                buttons,
            };
            dispatch({ type: 'ADD_RESPONSE', payload });
            try {
                await axios.post('http://localhost:3001/add-response', payload);
            } catch (error) {
                console.error(error);
            }
            setSelectedCommand('');
            setResponse('');
            setButtons([]);
        }
    };

    const handleAddButton = () => {
        if (buttonText.trim() !== '' && buttonCommand.trim() !== '') {
            setButtons([...buttons, { text: buttonText, command: buttonCommand }]);
            setButtonText('');
            setButtonCommand('');
        }
    };

    const handleDeleteButton = (index) => {
        setButtons(buttons.filter((btn, btnIndex) => btnIndex !== index));
    };

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Add Response</Typography>
            <TextField
                label="Select Command"
                select
                value={selectedCommand}
                onChange={(e) => setSelectedCommand(e.target.value)}
                fullWidth
                margin="normal"
                SelectProps={{ native: true }}
            >
                <option value=""></option>
                {state.commands.map((cmd, index) => (
                    <option key={index} value={cmd.command}>
                        {cmd.command}
                    </option>
                ))}
            </TextField>
            <TextField
                label="Response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Typography variant="h6" gutterBottom>Add Buttons</Typography>
            <TextField
                label="Button Text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Button Command"
                value={buttonCommand}
                onChange={(e) => setButtonCommand(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddButton} fullWidth>
                Add Button
            </Button>
            <List>
                {buttons.map((btn, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${btn.text} (${btn.command})`} />
                        <IconButton edge="end" onClick={() => handleDeleteButton(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={handleSaveResponse} fullWidth>
                Save Response
            </Button>
        </Paper>
    );
};

export default ResponseEditor;
