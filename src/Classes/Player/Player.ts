import { Owner } from '../../Types/Types';
import { PlayerTank } from '../PlayerTank/PlayerTank';

export class Player {
  public playerTank: PlayerTank | null = null;
  private playerLivesLeft = 3;
  private playerScore = 0;
  constructor(private owner: Owner) {}
  getPlayerLivesLeft() {
    return this.playerLivesLeft;
  }
  modifyPlayerLivesLeft(amount: number) {
    this.playerLivesLeft += amount;
  }
  getPlayerScore() {
    return this.playerScore;
  }
  addPlayerScore(amount: number) {
    this.playerScore += amount;
  }
}
