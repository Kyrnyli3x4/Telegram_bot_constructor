import React, { useState, useEffect } from 'react';

const CommandEditor = () => {
    const [commands, setCommands] = useState([]);
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/bot/commands')
            .then(res => res.json())
            .then(data => setCommands(data));
    }, []);

    const addCommand = () => {
        fetch('http://localhost:5000/api/bot/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command, response })
        })
            .then(res => res.json())
            .then(data => {
                setCommands([...commands, { command, response }]);
                setCommand('');
                setResponse('');
            });
    };

    const deleteCommand = (cmd) => {
        fetch(`http://localhost:5000/api/bot/commands/${cmd.command}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setCommands(commands.filter(c => c.command !== cmd.command));
            });
    };

    const updateCommand = () => {
        fetch(`http://localhost:5000/api/bot/commands/${command}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ response })
        })
            .then(res => res.json())
            .then(() => {
                setCommands(commands.map(cmd => cmd.command === command ? { ...cmd, response } : cmd));
                setCommand('');
                setResponse('');
            });
    };

    const handleEdit = (cmd) => {
        setCommand(cmd.command);
        setResponse(cmd.response);
    };

    return (
        <div>
            <h3>Manage Commands</h3>
            <input
                type="text"
                placeholder="Command"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
            />
            <input
                type="text"
                placeholder="Response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
            />
            <button onClick={addCommand}>Add</button>
            <button onClick={updateCommand}>Update</button>
            <ul>
                {commands.map((cmd, index) => (
                    <li key={index}>
                        {cmd.command}: {cmd.response}
                        <button onClick={() => handleEdit(cmd)}>Edit</button>
                        <button onClick={() => deleteCommand(cmd)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommandEditor;
