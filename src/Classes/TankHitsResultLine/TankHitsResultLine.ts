import type { PlayerResults } from "../PlayerResults/PlayerResults";
import resultsArrowImage from "../../assets/images/Results/ResultsArrow.png";
import type { TankTypes } from "../../Types/Types";
import { RESULTS_SCREEN_POINTS_ANIMATION_DELAY } from "../../constants";

const white = "rgba(255, 255, 255, 1)";

export class TankHitsResultLine {
  private font = `"Press Start 2P", system-ui`;
  private pointsAnimationCounter = 0;
  private pointsAnimationEnded = false;
  private pointsAnimationDelay = RESULTS_SCREEN_POINTS_ANIMATION_DELAY;
  private lineYPosition: number;
  private resultsLineNumber: number;
  private tankImage: HTMLImageElement;
  private playerResultsBoard: PlayerResults;
  private pointsPerTank: number;
  private pointsCounter = 0;
  private destroyedTanksCounter = 0;
  private resultsArrowImage: HTMLImageElement;
  private tankType: TankTypes;

  constructor(
    lineYPosition: number,
    tankType: TankTypes,
    pointsPerTank: number,
    tankImage: HTMLImageElement,
    playerResultsBoard: PlayerResults,
    resultsLineNumber: number,
  ) {
    this.lineYPosition = lineYPosition;
    this.pointsPerTank = pointsPerTank;
    this.tankType = tankType;
    this.resultsLineNumber = resultsLineNumber;
    this.playerResultsBoard = playerResultsBoard;
    this.tankImage = tankImage;
    this.resultsArrowImage = new Image();
    this.resultsArrowImage.src = resultsArrowImage;
  }

  draw(
    canvasCtx: CanvasRenderingContext2D,
    tanksDestroyed: number,
    deltaTime: number,
  ) {
    this.animateTanksHitsResultLine(canvasCtx, this.tankImage);
    this.drawAnimatedPointsFromTanksHits(
      canvasCtx,
      this.resultsLineNumber,
      tanksDestroyed, //!! get number of tanks destroyed from the game and pass it here
      this.pointsPerTank,
      deltaTime,
    );

    this.drawAnimatedHitTanksNumber(canvasCtx, this.resultsLineNumber);
  }

  private animateTanksHitsResultLine(
    canvasCtx: CanvasRenderingContext2D,
    tankImage: HTMLImageElement,
  ) {
    canvasCtx.drawImage(
      this.resultsArrowImage,
      180,
      this.lineYPosition - 13,
      12,
      12,
    );

    canvasCtx.drawImage(tankImage, 196, this.lineYPosition - 18, 22, 22);
  }

  private drawAnimatedPointsFromTanksHits(
    canvasCtx: CanvasRenderingContext2D,
    pointsLineNumber: number,
    tanksDestroyed: number,
    pointsPerTank: number,
    deltaTime: number,
  ) {
    const currentAnimatedPointsLineNumber =
      this.playerResultsBoard.getCurrentAnimatedPointsLineNumber();
    const pointsPlaceholder = `  `;
    let pointsTextOffset = 0;

    const fontSize = 12;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;

    const pointsText =
      currentAnimatedPointsLineNumber === pointsLineNumber ||
      this.pointsAnimationEnded
        ? `${this.pointsCounter} PTS`
        : `${pointsPlaceholder} PTS`;
    pointsTextOffset = canvasCtx.measureText(pointsText).width;

    canvasCtx.fillText(
      pointsText,
      145 - pointsTextOffset,
      this.lineYPosition,
      100,
    );

    if (
      currentAnimatedPointsLineNumber === pointsLineNumber &&
      !this.pointsAnimationEnded
    ) {
      this.pointsAnimationCounter += deltaTime;
      if (this.pointsAnimationCounter >= this.pointsAnimationDelay) {
        if (this.destroyedTanksCounter >= tanksDestroyed) {
          this.pointsAnimationEnded = true;
          this.playerResultsBoard.setCurrentAnimatedPointsLineNumber(
            currentAnimatedPointsLineNumber + 1,
          );
          return;
        }
        this.destroyedTanksCounter += 1;
        this.pointsCounter += pointsPerTank;
      }
    }
  }

  private drawAnimatedHitTanksNumber(
    canvasCtx: CanvasRenderingContext2D,
    pointsLineNumber: number,
  ) {
    let numberTextOffset = 0;
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

    numberTextOffset = canvasCtx.measureText(numberText).width;

    canvasCtx.fillText(
      numberText,
      178 - numberTextOffset,
      this.lineYPosition,
      100,
    );
  }

  getTankType() {
    return this.tankType;
  }
}
