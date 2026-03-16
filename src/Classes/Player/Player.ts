import type { Owner } from "../../Types/Types";
import { PlayerTank } from "../PlayerTank/PlayerTank";

export class Player {
  public playerTank: PlayerTank | null = null;
  private playerLivesLeft = 3;
  private playerScore = 0;
  private owner: Owner;
  constructor(owner: Owner) {
    this.owner = owner;
  }
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

  isPlayerDestroyed() {
    if (this.playerLivesLeft === 0 && this.playerTank === null) {
      return true;
    }
    return false;
  }

  getOwner() {
    return this.owner;
  }
}
