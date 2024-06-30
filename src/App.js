import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import CommandEditor from './components/CommandEditor';
import ButtonEditor from './components/ButtonEditor';

function App() {
    const [activeTab, setActiveTab] = useState('commands');

    return (
        <div className="App">
            <div className="editor-pane">
                <div className="tab-buttons">
                    <button onClick={() => setActiveTab('commands')} className={activeTab === 'commands' ? 'active' : ''}>
                        Commands
                    </button>
                    <button onClick={() => setActiveTab('buttons')} className={activeTab === 'buttons' ? 'active' : ''}>
                        Buttons
                    </button>
                </div>
                {activeTab === 'commands' ? <CommandEditor /> : <ButtonEditor />}
            </div>
            <div className="chat-pane">
                <Chat />
            </div>
        </div>
    );
}

export default App;
