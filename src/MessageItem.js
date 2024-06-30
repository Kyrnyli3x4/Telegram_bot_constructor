import React, { useState } from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    TextField,
    ListItemSecondaryAction,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const MessageItem = ({ msg, index, updateMessage, deleteMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(msg);

    const handleSave = () => {
        updateMessage(index, editedMessage);
        setIsEditing(false);
    };

    return (
        <ListItem>
            {isEditing ? (
                <>
                    <TextField
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        fullWidth
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={() => setIsEditing(false)}>
                            <CancelIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </>
            ) : (
                <>
                    <ListItemText primary={msg} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteMessage(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </>
            )}
        </ListItem>
    );
};

export default MessageItem;
