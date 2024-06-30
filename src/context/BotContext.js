import React, { createContext, useReducer } from 'react';

const initialState = {
    commands: [],
};

const BotContext = createContext(initialState);

const botReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COMMAND':
            return {
                ...state,
                commands: [...state.commands, { command: action.payload, response: '', buttons: [] }],
            };
        case 'ADD_RESPONSE':
            return {
                ...state,
                commands: state.commands.map(cmd =>
                    cmd.command === action.payload.command
                        ? { ...cmd, response: action.payload.response, buttons: action.payload.buttons }
                        : cmd
                ),
            };
        default:
            return state;
    }
};

const BotProvider = ({ children }) => {
    const [state, dispatch] = useReducer(botReducer, initialState);

    return (
        <BotContext.Provider value={{ state, dispatch }}>
            {children}
        </BotContext.Provider>
    );
};

export { BotContext, BotProvider };
