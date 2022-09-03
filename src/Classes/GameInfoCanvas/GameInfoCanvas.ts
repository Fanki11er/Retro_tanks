import { enemyTankIcon, playerTankIcon, roundFlagIcon } from '../Icon/Icon';
import { Players } from '../Players/Players';

export class GameInfoCanvas {
  width;
  height;
  canvas;
  canvasCtx;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx = this.canvas.getContext('2d');
    //this.update(0, );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this.canvas, 0, 0);
  }

  update(
    enemyTanksLeft: number = 0,
    //player1LivesLeft: number = 0,
    //player2LivesLeft: number = 0,
    //players: number = 1,
    players: Players,
    roundNumber: number = 0,
    gameStatus: string = 'Pause',
  ) {
    this.canvasCtx?.clearRect(0, 0, this.width, this.height);
    this.drawBorders();
    this.drawEnemyTanksLeftInfo(enemyTanksLeft);
    if (players.player1) {
      this.drawPlayerLivesLeft(players.player1.getPlayerLivesLeft());
    }
    if (players.player2) {
      this.drawPlayerLivesLeft(players.player2.getPlayerLivesLeft(), true);
    }
    this.drawRoundFlag(roundNumber);
  }

  private drawBorders() {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = 'rgba(127, 127, 127, 1)';
      this.canvasCtx.fillRect(0, 0, this.width, 4);
      this.canvasCtx.fillRect(0, 316, this.width, 4);
      this.canvasCtx.fillRect(0, 0, 20, this.height);
      this.canvasCtx.fillRect(332, 0, 40, this.height);
    }
  }

  private drawEnemyTanksLeftInfo(enemyTanksLeft: number) {
    if (this.canvasCtx) {
      const xAxis = 341;
      const yAxis = 30;
      const size = 10;
      const delta = 12;
      let xOffset = 0;
      let yOffset = 0;
      for (let i = 0; i < enemyTanksLeft; i++) {
        this.canvasCtx.drawImage(enemyTankIcon.icon, xAxis + xOffset, yAxis + yOffset, size, size);
        xOffset += delta;

        if (xAxis + xOffset >= xAxis + delta * 2) {
          xOffset = 0;
          yOffset += delta;
        }
      }
    }
  }

  private drawPlayerLivesLeft(playerLivesLeft: number, secondPlayer: boolean = false) {
    const text = secondPlayer ? 'II P' : ' I P';
    const offset = secondPlayer ? 35 : 0;
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = 'black';
      this.canvasCtx.font = 'bold 16px Arial';
      this.canvasCtx.fillText(text, 338, 200 + offset, 30);
      this.canvasCtx.drawImage(playerTankIcon.icon, 340, 205 + offset, 10, 10);
      this.canvasCtx.fillText(`${playerLivesLeft}`, 352, 215 + offset, 30);
    }
  }

  private drawRoundFlag(roundNumber: number) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = 'black';
      this.canvasCtx.font = 'bold 16px Arial';
      this.canvasCtx.drawImage(roundFlagIcon.icon, 340, 270);
      this.canvasCtx.fillText(`${roundNumber}`, 351, 300, 30);
    }
  }
}

