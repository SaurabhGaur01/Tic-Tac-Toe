import React from 'react';
import { AppContext } from '../AppProvider';

const GameType = ({ value, name }) => (
    <AppContext.Consumer>
        {context => (
            <li 
                onClick={() => context.changeType(value)} 
                className={value === context.gameType ? "active" : ""}> 
                {name} 
            </li>
        )}
    </AppContext.Consumer>
);

GameType.contextType = AppContext;

export default GameType;  