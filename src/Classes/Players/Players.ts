import { Player } from '../Player/Player';

export class Players {
  player1: Player | null = null;
  player2: Player | null = null;

  constructor(numberOfPlaters: 1 | 2) {
    this.setPlayers(numberOfPlaters);
  }
  private setPlayers(playerNumber: 1 | 2) {
    this.player1 = new Player('player1');
    if (playerNumber === 2) {
      this.player2 = new Player('player2');
    }
  }
}
