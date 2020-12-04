import { getRandom } from '../utility/common';

export const THINKING_TIME = 500;

export const ICON_PLACE_HOLDDER = 'I';

export const GAME_TYPES = {
    TWO_PLAYERS: 0,
    VERSUS_COMPUTER: 1
}

export const ICON_TYPES = {
    O: 0,
    X: 1
}
  
export const ICON_CHARS = ['O', 'X'];
  
export const PLAYER_TURNS = {
    HUMAN: 0,
    COMPUTER: 1
}

export const initState = {
    gameType: GAME_TYPES.TWO_PLAYERS,
    currentIcon: getRandom(0, 2),
    playerTurn: getRandom(0, 2),
    cells: new Array(9).fill(null),
    gameState: {
      position: "",
      iconType: null,
      isTie: null,
    },
}
