import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        const newMessage = { user: true, text: input };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // Send message to server and get response
        fetch('http://localhost:5000/api/bot/chat-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: input })
        })
            .then(res => res.json())
            .then(data => {
                const botMessage = { user: false, text: data.message };
                setMessages(prevMessages => [...prevMessages, newMessage, botMessage]);
            });

        setInput('');
    };

    useEffect(() => {
        const chatBox = document.querySelector('.chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);

    return (
        <div className="chat-pane">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.user ? 'user-message' : 'bot-message'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
