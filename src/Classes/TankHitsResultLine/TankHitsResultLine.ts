import type { PlayerResults } from "../PlayerResults/PlayerResults";
import resultsArrowImage from "../../assets/images/Results/ResultsArrow.png";

const white = "rgba(255, 255, 255, 1)";

export class TankHitsResultLine {
  private font = `"Press Start 2P", system-ui`;
  private pointsAnimationCounter = 0;
  private pointsAnimationEnded = false;
  private pointsAnimationDelay = 100;
  private firstLineYPosition: number;
  private lineHeight: number;
  private tankImage: HTMLImageElement;
  private playerResultsBoard: PlayerResults;
  private pointsPerTank: number;
  private pointsCounter = 0;
  private destroyedTanksCounter = 0;
  private resultsArrowImage: HTMLImageElement;

  constructor(
    firstLineYPosition: number,
    lineHeight: number,
    pointsPerTank: number,
    tankImage: HTMLImageElement,
    playerResultsBoard: PlayerResults,
  ) {
    this.firstLineYPosition = firstLineYPosition;
    this.lineHeight = lineHeight;
    this.pointsPerTank = pointsPerTank;
    this.playerResultsBoard = playerResultsBoard;
    this.tankImage = tankImage;
    this.resultsArrowImage = new Image();
    this.resultsArrowImage.src = resultsArrowImage;
  }

  draw(canvasCtx: CanvasRenderingContext2D, lineNumber: number) {
    this.animateTanksHitsResultLine(canvasCtx, lineNumber, this.tankImage);
    this.drawAnimatedPointsFromTanksHits(
      canvasCtx,
      lineNumber,
      1,
      5,
      this.pointsPerTank,
    );
    this.drawAnimatedHitTanksNumber(canvasCtx, lineNumber, 1);
  }

  private animateTanksHitsResultLine(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    tankImage: HTMLImageElement,
  ) {
    canvasCtx.drawImage(
      this.resultsArrowImage,
      180,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight - 13,
      12,
      12,
    );

    canvasCtx.drawImage(
      tankImage,
      196,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight - 18,
      22,
      22,
    );
  }

  private drawAnimatedPointsFromTanksHits(
    canvasCtx: CanvasRenderingContext2D,
    canvasLineNumber: number,
    pointsLineNumber: number,
    tanksDestroyed: number,
    pointsPerTank: number,
  ) {
    const currentAnimatedPointsLineNumber =
      this.playerResultsBoard.getCurrentAnimatedPointsLineNumber();
    const pointsPlaceholder = `  `;

    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;

    if (
      currentAnimatedPointsLineNumber === pointsLineNumber &&
      !this.pointsAnimationEnded
    ) {
      this.pointsAnimationCounter += 1;
      if (this.pointsAnimationCounter % this.pointsAnimationDelay === 0) {
        this.pointsCounter += pointsPerTank;
        this.destroyedTanksCounter += 1;
        if (this.destroyedTanksCounter >= tanksDestroyed) {
          this.pointsAnimationEnded = true;
          this.playerResultsBoard.setCurrentAnimatedPointsLineNumber(
            currentAnimatedPointsLineNumber + 1,
          );
        }
      }
    }

    const pointsText =
      currentAnimatedPointsLineNumber === pointsLineNumber ||
      this.pointsAnimationEnded
        ? `${this.pointsCounter} PTS`
        : `${pointsPlaceholder} PTS`;

    canvasCtx.fillText(
      pointsText,
      65,
      this.firstLineYPosition + (canvasLineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawAnimatedHitTanksNumber(
    canvasCtx: CanvasRenderingContext2D,
    canvasLineNumber: number,
    pointsLineNumber: number,
  ) {
    const currentAnimatedPointsLineNumber =
      this.playerResultsBoard.getCurrentAnimatedPointsLineNumber();
    const numberPlaceholder = ` `;

    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;

    const numberText =
      currentAnimatedPointsLineNumber === pointsLineNumber ||
      this.pointsAnimationEnded
        ? `${this.destroyedTanksCounter}`
        : `${numberPlaceholder}`;

    canvasCtx.fillText(
      numberText,
      165,
      this.firstLineYPosition + (canvasLineNumber - 1) * this.lineHeight,
      100,
    );
  }
}
