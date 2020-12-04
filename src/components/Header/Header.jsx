import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { GAME_TYPES } from '../../constants/common';
import GameType from './GameType';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Tic Tac Toe</h1>
        <ul>
          <GameType value={GAME_TYPES.TWO_PLAYERS} name="2 Players" />
          <GameType value={GAME_TYPES.VERSUS_COMPUTER} name="Versus Computer" />
        </ul>
        <div>
          <button onClick={() => this.context.newGame()}>New Game</button>
        </div>
      </header>
    );
  }
}

Header.contextType = AppContext;

export default Header;
