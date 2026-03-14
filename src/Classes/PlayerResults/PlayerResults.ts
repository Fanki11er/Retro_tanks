import smallEnemyTankImage from "../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_forward.png";
import { TankHitsResultLine } from "../TankHitsResultLine/TankHitsResultLine";

const orange = "rgba(255, 96, 2, 1)";
const yellow = "rgba(255, 255, 111, 1)";
const white = "rgba(255, 255, 255, 1)";

const smallEnemyTankImag = new Image();
smallEnemyTankImag.src = smallEnemyTankImage;
smallEnemyTankImag.width = 22;
smallEnemyTankImag.height = 22;
export class PlayerResults {
  currentAnimatedPointsLineNumber = 1;
  animationEnded = false;
  //offset = 0;
  //isClosed = true;
  //isBlocked = true;
  private firstLineYPosition = 35;
  private lineHeight = 25;
  private font = `"Press Start 2P", system-ui`;
  public width: number;
  public height: number;
  private tankHitsResultLines: TankHitsResultLine[] = [
    new TankHitsResultLine(
      this.firstLineYPosition,
      this.lineHeight,
      100,
      smallEnemyTankImag,
      this,
    ),
  ];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getCurrentAnimatedPointsLineNumber() {
    return this.currentAnimatedPointsLineNumber;
  }

  setCurrentAnimatedPointsLineNumber(lineNumber: number) {
    this.currentAnimatedPointsLineNumber = lineNumber;
  }

  drawPlayerResults(
    canvasCtx: CanvasRenderingContext2D,
    delay: number,
    stage: number,
  ) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
      //canvasCtx.fillRect(0, 0, this.width, this.height / 2 - this.offset);

      this.drawHighScoreText(canvasCtx, 1);

      //Todo get number of points from the game and display it here
      this.drawHighScoreResultNumber(canvasCtx, 20000, 1);
      this.drawStageNumber(canvasCtx, stage, 2);
      this.drawFirstPlayerColumn(canvasCtx, 3);
      this.drawFirstPlayerResult(canvasCtx, 3500, 4);
      this.drawPlayerTanksHits(canvasCtx, 5);

      //   if (!this.isBlocked && this.isClosed) {
      //     this.openCurtin(delay);
      //   }
      //   if (!this.isBlocked && !this.isClosed) {
      //     this.closeCurtin(delay);
      //   }
      //   if (this.isClosed && this.isBlocked) {
      //     this.drawStageText(canvasCtx, stage);
      //   }
    }
  }

  private drawHighScoreText(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
  ) {
    const highScoreText = "HI-SCORE";
    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = orange;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      highScoreText,
      110,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawHighScoreResultNumber(
    canvasCtx: CanvasRenderingContext2D,
    highScore: number,
    lineNumber: number,
  ) {
    const highScoreText = highScore.toString();
    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = yellow;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      highScoreText,
      240,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawStageNumber(
    canvasCtx: CanvasRenderingContext2D,
    stage: number,
    lineNumber: number,
  ) {
    const stageText = `STAGE  ${stage}`;
    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      stageText,
      155,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawFirstPlayerColumn(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
  ) {
    const stageText = "I-PLAYER";
    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = orange;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      stageText,
      50,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawFirstPlayerResult(
    canvasCtx: CanvasRenderingContext2D,
    result: number,
    lineNumber: number,
  ) {
    const stageText = result.toString();
    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = yellow;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      stageText,
      100,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawPlayerTanksHits(
    canvasCtx: CanvasRenderingContext2D,
    startLineNumber: number,
  ) {
    this.tankHitsResultLines.forEach((line) => {
      line.draw(canvasCtx, startLineNumber);
    });
    // this.animateTanksHitsResultLine(
    //   canvasCtx,
    //   startLineNumber,
    //   500,
    //   smallEnemyTankImag,
    // );
  }

  //   private openCurtin(delay: number) {
  //     this.counter += 1;
  //     if (this.counter % delay === 0) {
  //       this.offset += 2;
  //     }
  //     if (this.offset >= this.height / 2) {
  //       this.isBlocked = true;
  //       this.isClosed = false;
  //     }
  //   }

  //   private closeCurtin(delay: number) {
  //     this.counter += 1;
  //     if (this.counter % delay === 0) {
  //       this.offset -= 2;
  //     }
  //     if (this.offset <= this.height / 2) {
  //       this.isBlocked = true;
  //       this.isClosed = true;
  //     }
  //   }

  //   private drawStageText(canvasCtx: CanvasRenderingContext2D, stage: number) {
  //     const stageInfoText = `Stage ${stage}`;
  //     const fontSize = 20;
  //     canvasCtx.globalCompositeOperation = "overlay";
  //     canvasCtx.fillStyle = "black";
  //     canvasCtx.font = `bold ${fontSize}px Arial`;
  //     const textMetrics = canvasCtx.measureText(stageInfoText);
  //     canvasCtx.fillText(
  //       stageInfoText,
  //       this.width / 2 - textMetrics.width / 2,
  //       this.height / 2 + fontSize / 2,
  //       100
  //     );
  //   }
}
