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

  getActivePlayersTanks() {
    const playersTanks = [];
    if (this.player1 && this.player1.playerTank) {
      playersTanks.push(this.player1.playerTank);
    }
    if (this.player2 && this.player2.playerTank) {
      playersTanks.push(this.player2.playerTank);
    }
    return playersTanks;
  }
}

