import React from 'react';
import { AppContext } from '../AppProvider';
import { ICON_CHARS, ICON_PLACE_HOLDDER } from '../../constants/common';

const Cell = ({ index }) => (
    <AppContext.Consumer>
        {context => {
            const value = context.cells[index];
            const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
            const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';

            return (
                <button
                    className={`cell cell-${index} ${isDoneClass}`}
                    onClick={() => context.humanPlay(index)}>
                    {icon}
                </button>
            );
        }}
    </AppContext.Consumer>
);

export default Cell;  