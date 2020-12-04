import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { GAME_TYPES, PLAYER_TURNS, ICON_CHARS } from '../../constants/common';
import Board from './Board';
import './Content.scss';

class Content extends Component {
  render() {
    let textInfo = '';
    const currentIconType = this.context.currentIcon;

    if (this.context.gameState.isTie) {
      textInfo = 'Tie!';
    } else {
      if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.context.gameState.position === "") {
          textInfo = `It's player(${ICON_CHARS[currentIconType]}) turn`;
        } else {
          textInfo = `Player(${ICON_CHARS[1 - currentIconType]}) wins!`;
        }
      } else {
        if (this.context.gameState.position === "") {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN) textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN) textInfo = `Computer win!`;
          else textInfo = `You win!`;
        }
      }
    }

    return (
      <main className="main">
        <div className="info">{textInfo}</div>
        <Board />
      </main>
    );
  }
}

Content.contextType = AppContext;

export default Content;
