import React, { useEffect, useState } from 'react';

const CommandList = () => {
    const [commands, setCommands] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/bot/commands')
            .then(res => res.json())
            .then(data => setCommands(data));
    }, []);

    return (
        <div>
            <h3>Commands</h3>
            <ul>
                {commands.map((cmd, index) => (
                    <li key={index}>{cmd.command}: {cmd.response}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommandList;
