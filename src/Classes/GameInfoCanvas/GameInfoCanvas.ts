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
    this.update();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this.canvas, 0, 0);
  }

  update(enemyTanksLeft: number = 0, playerLivesLeft: number = 0, roundNumber: number = 0, gameStatus: string = 'Pause') {
    this.canvasCtx?.clearRect(0, 0, this.width, this.height);
    this.drawBorders();
    this.drawEnemyTanksLeftInfo(enemyTanksLeft);
    this.drawPlayerLivesLeft(2);
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
      const xAxis = 337;
      const yAxis = 30;
      const size = 13;
      const delta = 17;
      let xOffset = 0;
      let yOffset = 0;
      this.canvasCtx.fillStyle = 'red';
      for (let i = 0; i < enemyTanksLeft; i++) {
        this.canvasCtx.fillRect(xAxis + xOffset, yAxis + yOffset, size, size);
        xOffset += delta;

        if (xAxis + xOffset >= xAxis + delta * 2) {
          xOffset = 0;
          yOffset += delta;
        }
      }
    }
  }

  private drawPlayerLivesLeft(playerLivesLeft: number) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = 'black';
      this.canvasCtx.font = 'bold 16px Arial';
      this.canvasCtx.fillText(' I P', 342, 200, 30);
      this.canvasCtx.fillRect(342, 202, 13, 13);
      this.canvasCtx.fillText(`${playerLivesLeft}`, 355, 215, 30);
    }
  }
}

