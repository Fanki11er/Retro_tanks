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

  subtractPlayerLife() {
    if (this.playerLivesLeft > 0) {
      this.playerLivesLeft -= 1;
    }
  }

  addPlayerLivesLeft() {
    this.playerLivesLeft += 1;
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

  resetPlayer() {
    this.playerLivesLeft = 3;
    this.playerScore = 0;
    this.playerTank = null;
  }
}
