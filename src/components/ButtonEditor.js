import React, { useState, useEffect } from 'react';

const ButtonEditor = () => {
    const [buttons, setButtons] = useState([]);
    const [label, setLabel] = useState('');
    const [action, setAction] = useState('');
    const [type, setType] = useState('inline');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/bot/buttons')
            .then(res => res.json())
            .then(data => setButtons(data));
    }, []);

    const addButton = () => {
        fetch('http://localhost:5000/api/bot/buttons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ label, action, type, message })
        })
            .then(res => res.json())
            .then(data => {
                setButtons([...buttons, { label, action, type, message }]);
                setLabel('');
                setAction('');
                setMessage('');
            });
    };

    const deleteButton = (index) => {
        fetch(`http://localhost:5000/api/bot/buttons/${index}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setButtons(buttons.filter((_, idx) => idx !== index));
            });
    };

    return (
        <div>
            <h3>Manage Buttons</h3>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="inline">Inline</option>
                <option value="regular">Regular</option>
            </select>
            <input
                type="text"
                placeholder="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            />
            <input
                type="text"
                placeholder="Action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message to bind"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={addButton}>Add Button</button>
            <ul>
                {buttons.map((btn, index) => (
                    <li key={index}>
                        {btn.type} Button: {btn.label} - {btn.action} - Bound to: {btn.message}
                        <button onClick={() => deleteButton(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ButtonEditor;
