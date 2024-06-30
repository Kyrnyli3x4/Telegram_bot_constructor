import React, { useContext, useState } from 'react';
import {
    Paper, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { BotContext } from '../context/BotContext';

const MessageList = () => {
    const { state, dispatch } = useContext(BotContext);
    const [newMessage, setNewMessage] = useState('');
    const [buttonDialogOpen, setButtonDialogOpen] = useState(false);
    const [newButton, setNewButton] = useState({ text: '', type: 'inline', command: '' });
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

    const addMessage = () => {
        if (newMessage.trim() === '') return;
        dispatch({ type: 'ADD_MESSAGE', payload: { text: newMessage, buttons: [] } });
        setNewMessage('');
    };

    const deleteMessage = (index) => {
        dispatch({ type: 'DELETE_MESSAGE', payload: index });
    };

    const handleAddButton = (index) => {
        setSelectedMessageIndex(index);
        setButtonDialogOpen(true);
    };

    const handleSaveButton = () => {
        const updatedMessage = {
            ...state.messages[selectedMessageIndex],
            buttons: [...(state.messages[selectedMessageIndex].buttons || []), newButton],
        };
        dispatch({ type: 'UPDATE_MESSAGE', payload: { index: selectedMessageIndex, message: updatedMessage } });
        setButtonDialogOpen(false);
        setNewButton({ text: '', type: 'inline', command: '' });
    };

    return (
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Add a Message
            </Typography>
            <TextField
                label="New Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addMessage}
                fullWidth
            >
                Add Message
            </Button>
            <List>
                {state.messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg.text} />
                        <IconButton edge="end" onClick={() => handleAddButton(index)}>
                            <AddIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => deleteMessage(index)}>
                            <DeleteIcon />
                        </IconButton>
                        <List>
                            {msg.buttons && msg.buttons.map((btn, btnIndex) => (
                                <ListItem key={btnIndex}>
                                    <ListItemText primary={`Button: ${btn.text}, Type: ${btn.type}, Command: ${btn.command}`} />
                                    <IconButton edge="end" onClick={() => deleteMessage(index, btnIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                ))}
            </List>
            <Dialog open={buttonDialogOpen} onClose={() => setButtonDialogOpen(false)}>
                <DialogTitle>Add Button</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Button Text"
                        value={newButton.text}
                        onChange={(e) => setNewButton({ ...newButton, text: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Select
                        label="Button Type"
                        value={newButton.type}
                        onChange={(e) => setNewButton({ ...newButton, type: e.target.value })}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="inline">Inline</MenuItem>
                        <MenuItem value="keyboard">Keyboard</MenuItem>
                    </Select>
                    <TextField
                        label="Button Command"
                        value={newButton.command}
                        onChange={(e) => setNewButton({ ...newButton, command: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setButtonDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveButton} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default MessageList;
