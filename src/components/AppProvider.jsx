import React from 'react';
import { checkGameState, getRandom, replace, findBestMove, findRandomMove } from '../utility/common';
import { THINKING_TIME, initState, PLAYER_TURNS, GAME_TYPES } from '../constants/common';

export const AppContext = React.createContext();

export default class AppProvider extends React.Component {
  state = {
    gameType: initState.gameType,
    currentIcon: initState.currentIcon,
    playerTurn: initState.playerTurn,
    cells: initState.cells,
    gameState: initState.gameState,

    changeType: (type) => {
      if (this.state.gameType !== type) {
        this.initNewGame(type);
      }
    },
    humanPlay: (index) => {
      this.humanPlay(index)
    },
    newGame: () => {
      this.initNewGame(this.state.gameType);
    }
  }

  componentDidMount() {
    this.initGame();
  }
  
  initGame = () => {
    if (this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
      this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        const randomMove = findRandomMove(this.state.cells);
        this.computerPlay(randomMove);
      }, THINKING_TIME);
    }
  }

  initNewGame = (type = initState.gameType) => {
    this.setState(() => {
      return {
        gameType: type,
        currentIcon: getRandom(0, 2),
        playerTurn: getRandom(0, 2),
        cells: initState.cells,
        gameState: initState.gameState,
      }
    }, () => {
      this.initGame();
    });
  }

  applyState = (prevState, index) => {
    const cells = prevState.cells;
    const nextIcon = 1 - prevState.currentIcon;
    const nextPlayerTurn = 1 - prevState.playerTurn;
    const nextCells = replace(cells, index, prevState.currentIcon);
    const gameState = checkGameState(nextCells);

    return {
      gameState: gameState,
      currentIcon: nextIcon,
      playerTurn: nextPlayerTurn,
      cells: nextCells
    }
  }

  humanPlay = (index) => {
    if (this.state.gameState.position === "" && this.state.cells[index] === null &&
      (this.state.gameType === GAME_TYPES.TWO_PLAYERS || this.state.playerTurn === PLAYER_TURNS.HUMAN)) {

      this.setState(prevState => {
        return this.applyState(prevState, index);
      }, () => {
        // Make a move for computer if the game is in 'versus computer' mode
        if (this.state.gameState.position === "" &&
          this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
          this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

          setTimeout(() => {
            this.makeAIMove();
          }, THINKING_TIME);
        }
      });
    }
  }

  computerPlay = (index) => {
    if (this.state.gameState.position === "" && this.state.cells[index] === null &&
      this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
      this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

      this.setState(prevState => this.applyState(prevState, index));
    }
  }

  makeAIMove = () => {
    const bestMove = findBestMove(this.state.cells, this.state.currentIcon);

    if (bestMove !== null) {
      this.computerPlay(bestMove);
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}