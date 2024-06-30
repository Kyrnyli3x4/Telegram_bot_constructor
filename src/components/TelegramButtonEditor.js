import React, { useState } from 'react';

const TelegramButtonEditor = () => {
    const [buttons, setButtons] = useState([]);

    const addButton = (type) => {
        const label = prompt('Enter button label:');
        const action = prompt('Enter button action:');
        setButtons([...buttons, { type, label, action }]);
    };

    return (
        <div>
            <h3>Telegram Buttons</h3>
            <button onClick={() => addButton('inline')}>Add Inline Button</button>
            <button onClick={() => addButton('regular')}>Add Regular Button</button>
            <ul>
                {buttons.map((btn, index) => (
                    <li key={index}>{btn.type} Button: {btn.label} - {btn.action}</li>
                ))}
            </ul>
        </div>
    );
};

export default TelegramButtonEditor;
