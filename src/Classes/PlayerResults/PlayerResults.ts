import smallEnemyTankImage from "../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_forward.png";
import fastEnemyTankImage from "../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_forward.png";
import { TANKS_SETTINGS } from "../../constants";
import { TankHitsResultLine } from "../TankHitsResultLine/TankHitsResultLine";
import type { Game } from "../Game/Game";
import type { DestroyedBy, Owner } from "../../Types/Types";

const orange = "rgba(255, 96, 2, 1)";
const yellow = "rgba(255, 255, 111, 1)";
const white = "rgba(255, 255, 255, 1)";

export class PlayerResults {
  currentAnimatedPointsLineNumber = 1;
  animationEnded = false;
  private nextStepCounter = 0;
  private nextStepDelay = 1000;
  //offset = 0;
  //isClosed = true;
  //isBlocked = true;
  private firstLineYPosition = 35;
  private lineHeight = 25;
  private font = `"Press Start 2P", system-ui`;
  public width: number;
  public height: number;
  private tankHitsResultLines: TankHitsResultLine[] = [];
  private game: Game;
  constructor(width: number, height: number, game: Game) {
    this.width = width;
    this.height = height;
    this.game = game;
    this.generateTankHitsResultLines(5);
  }

  getCurrentAnimatedPointsLineNumber() {
    return this.currentAnimatedPointsLineNumber;
  }

  setCurrentAnimatedPointsLineNumber(lineNumber: number) {
    this.currentAnimatedPointsLineNumber = lineNumber;
  }

  private getTotalDestroyedTanksCount(
    destroyedTanks: DestroyedBy[],
    player: Owner,
  ) {
    return destroyedTanks.filter((tank) => tank.destroyedBy === player).length;
  }

  drawPlayerResults(
    canvasCtx: CanvasRenderingContext2D,
    stage: number,
    playerScore: number,
    destroyedTanks: DestroyedBy[],
  ) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";

      this.drawHighScoreText(canvasCtx, 1);

      //Todo get number of points from the game and display it here
      this.drawHighScoreResultNumber(canvasCtx, 20000, 1);
      this.drawStageNumber(canvasCtx, stage, 2);
      this.drawFirstPlayerColumn(canvasCtx, 3);
      this.drawFirstPlayerResult(canvasCtx, playerScore, 4); //!! Total points
      this.drawPlayerTanksHits(canvasCtx);
      this.drawHorizontalLine(canvasCtx, 270);
      this.drawTotalDestroyedTanks(
        canvasCtx,
        this.getTotalDestroyedTanksCount(destroyedTanks, "player1"),
        this.currentAnimatedPointsLineNumber,
        285,
      );
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

  private drawPlayerTanksHits(canvasCtx: CanvasRenderingContext2D) {
    this.tankHitsResultLines.forEach((line) => {
      const tankType = line.getTankType();
      const destroyedTanks = this.game.getDestroyedEnemyTanksList();
      const destroyedTanksOfType = destroyedTanks.filter(
        (tank) => tank.type === tankType,
      ).length;

      line.draw(canvasCtx, destroyedTanksOfType);
    });
  }

  private generateTankHitsResultLines(startLineNumber: number) {
    const IMAGE_SIZE = 22;
    let nextIndex = 0;
    const lineNumber = startLineNumber - 1;

    const smallEnemyTankImg = new Image();
    smallEnemyTankImg.src = smallEnemyTankImage;
    smallEnemyTankImg.width = IMAGE_SIZE;
    smallEnemyTankImg.height = IMAGE_SIZE;

    nextIndex = this.tankHitsResultLines.push(
      new TankHitsResultLine(
        this.firstLineYPosition +
          (lineNumber + nextIndex) * this.lineHeight +
          10,
        "Small",
        TANKS_SETTINGS.Small.value,
        smallEnemyTankImg,
        this,
        1,
      ),
    );

    const fastEnemyTankImg = new Image();
    fastEnemyTankImg.src = fastEnemyTankImage;
    fastEnemyTankImg.width = IMAGE_SIZE;
    fastEnemyTankImg.height = IMAGE_SIZE;

    nextIndex = this.tankHitsResultLines.push(
      new TankHitsResultLine(
        this.firstLineYPosition +
          (lineNumber + nextIndex) * this.lineHeight +
          20,
        "Fast",
        TANKS_SETTINGS.Fast.value,
        fastEnemyTankImg,
        this,
        2,
      ),
    );

    nextIndex = this.tankHitsResultLines.push(
      new TankHitsResultLine(
        this.firstLineYPosition +
          (lineNumber + nextIndex) * this.lineHeight +
          35,
        "Power",
        TANKS_SETTINGS.Fast.value, //!! Temporary
        fastEnemyTankImg, //!! Temporary
        this,
        3,
      ),
    );

    this.tankHitsResultLines.push(
      new TankHitsResultLine(
        this.firstLineYPosition +
          (lineNumber + nextIndex) * this.lineHeight +
          50,
        "Armor",
        TANKS_SETTINGS.Fast.value, //!! Temporary
        fastEnemyTankImg, //!! Temporary
        this,
        4,
      ),
    );
  }

  private drawHorizontalLine(
    canvasCtx: CanvasRenderingContext2D,
    yPosition: number,
  ) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(155, yPosition);
    canvasCtx.lineTo(250, yPosition);
    canvasCtx.strokeStyle = white;
    canvasCtx.lineWidth = 4;
    canvasCtx.stroke();
  }

  private drawTotalDestroyedTanks(
    canvasCtx: CanvasRenderingContext2D,
    destroyedTanks: number,
    currentAnimatedLineNumber: number,
    yPosition: number,
  ) {
    const lineNumber = 5;
    const destroyedTanksText = `TOTAL ${destroyedTanks}`;
    const fontSize = 12;
    const numberPlaceholder = "TOTAL";
    const resultText =
      currentAnimatedLineNumber === lineNumber
        ? destroyedTanksText
        : numberPlaceholder;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;

    canvasCtx.fillText(resultText, 84, yPosition, 100);

    if (
      this.currentAnimatedPointsLineNumber === lineNumber &&
      !this.animationEnded
    ) {
      this.nextStepCounter += 1;
      if (this.nextStepCounter % this.nextStepDelay === 0) {
        this.animationEnded = true;
      }
    }
  }
}
