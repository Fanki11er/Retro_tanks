import { theme } from "../../GlobalStyles/theme";
import type { Game } from "../Game/Game";
import titleImageSrc from "../../Assets/images/MainMenuScreen/GameTitle.png";
import companyLogoSrc from "../../Assets/images/MainMenuScreen/NamcotLogo.png";
import tankAnimationPhase1 from "../../Assets/images/Tanks/Player1Tank/Player1_medium_tank_1_right.png";
import tankAnimationPhase2 from "../../Assets/images/Tanks/Player1Tank/Player1_medium_tank_2_right.png";
import { ImageManager } from "../ImageManager/ImageManager";
import { AnimatedTankIcon } from "../AnimatedTankIcon/AnimatedTankIcon";

const { white } = theme.colors;
const { main } = theme.fonts;

export class MainMenu {
  private targetFirstLineYPosition = 30;
  private firstLineYPosition = 340;
  private lineHeight = 25;
  private fontSize = 12;
  private font = main;
  private game: Game;
  private imageManager = new ImageManager();
  private animatedTankIcon = new AnimatedTankIcon(
    [tankAnimationPhase1, tankAnimationPhase2],
    20,
    20,
    20,
  );
  private width: number;
  private height: number;
  private menuOptions = ["1 PLAYER", "2 PLAYERS", "CONSTRUCTION"];
  private selectedOptionIndex = 0;
  private animationCounter = 0;
  private isAnimationEnded = false;
  private animationSpeed: number;
  private animationDelay: number;

  constructor(
    width: number,
    height: number,
    game: Game,
    animationSpeed: number = 3,
    animationDelay: number = 40,
  ) {
    this.width = width;
    this.height = height;
    this.game = game;
    this.animationSpeed = animationSpeed;
    this.animationDelay = animationDelay;
    this.imageManager.addImage("title", titleImageSrc, 280, 100);
    this.imageManager.addImage("companyLogo", companyLogoSrc, 100, 15);
  }

  draw(
    canvasCtx: CanvasRenderingContext2D,
    playerScore: number,
    highScore: number,
  ) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";

      if (!this.isAnimationEnded) {
        this.animateMenu();
      }

      const titleImageDimensions =
        this.imageManager.getImageDimensions("title");
      const companyLogoDimensions =
        this.imageManager.getImageDimensions("companyLogo");

      const imagesOffset =
        (titleImageDimensions?.height || 0) +
        (companyLogoDimensions?.height || 0) -
        10;

      this.drawHighScoreTextLine(canvasCtx, 1, playerScore, highScore);
      this.drawTitleImage(canvasCtx, 2);
      this.drawSelectPlayerText(
        canvasCtx,
        3,
        1,
        "PLAYER",
        titleImageDimensions?.height || 0,
      );

      if (this.isAnimationEnded) {
        this.animatedTankIcon.draw(
          canvasCtx,
          105,
          this.firstLineYPosition +
            2 * this.lineHeight +
            (titleImageDimensions?.height || 0) -
            17 +
            this.lineHeight * this.selectedOptionIndex,
        );
      }

      this.drawSelectPlayerText(
        canvasCtx,
        4,
        2,
        "PLAYERS",
        titleImageDimensions?.height || 0,
        true,
      );
      this.drawConstructionTextLine(
        canvasCtx,
        5,
        titleImageDimensions?.height || 0,
        true,
      );
      this.drawCompanyLogo(canvasCtx, 6, titleImageDimensions?.height || 0);
      this.drawCompanyInformationTextLine(
        canvasCtx,
        "© 1980 1985 NAMCO LTD.",
        7,
        0,
        imagesOffset,
      );
      this.drawCompanyInformationTextLine(
        canvasCtx,
        "ALL RIGHTS RESERVED",
        8,
        10,
        imagesOffset,
      );
    }
  }

  private drawHighScoreTextLine(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    playerScore: number,
    highScore: number,
  ) {
    this.drawPlayerScoreText(canvasCtx, playerScore, lineNumber);
    this.drawHighScoreText(canvasCtx, lineNumber, highScore);
  }

  private drawPlayerScoreText(
    canvasCtx: CanvasRenderingContext2D,
    playerScore: number,
    lineNumber: number,
  ) {
    const playerScoreText = "I-";
    const playerScoreNumberText = `${playerScore < 10 ? "0" + playerScore.toString() : playerScore.toString()}`;
    const fontSize = this.fontSize;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      playerScoreText,
      30,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
    const pointsTextOffset = canvasCtx.measureText(playerScoreNumberText).width;
    canvasCtx.fillText(
      playerScoreNumberText,
      125 - pointsTextOffset,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawHighScoreText(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    highScore: number,
  ) {
    const highScoreText = "HI-";
    const highScoreNumber = highScore.toString();
    const fontSize = this.fontSize;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      highScoreText,
      135,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
    const pointsTextOffset = canvasCtx.measureText(highScoreNumber).width;
    canvasCtx.fillText(
      highScoreNumber,
      245 - pointsTextOffset,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight,
      100,
    );
  }

  private drawTitleImage(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
  ) {
    if (canvasCtx) {
      canvasCtx.globalCompositeOperation = "overlay";
      const titleImageDimensions =
        this.imageManager.getImageDimensions("title");
      const x = (this.width - (titleImageDimensions?.width || 0)) / 2;
      const y =
        this.firstLineYPosition + (lineNumber - 1) * this.lineHeight - 10;
      canvasCtx.drawImage(
        this.imageManager.getImage("title")!,
        x,
        y,
        titleImageDimensions?.width || 0,
        titleImageDimensions?.height || 0,
      );
    }
  }

  private drawSelectPlayerText(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    playerNumber: number,
    playerText: string,
    offset: number = 0,
    notUsed: boolean = false,
  ) {
    const selectPlayerText = `${playerNumber} ${playerText}`;
    const fontSize = this.fontSize;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = notUsed ? "gray" : white;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    canvasCtx.fillText(
      selectPlayerText,
      140,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight + offset,
      200,
    );
  }

  private drawConstructionTextLine(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    offset: number = 0,
    notUsed: boolean = false,
  ) {
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.strokeStyle = notUsed ? "gray" : white;
    canvasCtx.fillText(
      "CONSTRUCTION",
      140,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight + offset,
      200,
    );
  }

  private drawCompanyLogo(
    canvasCtx: CanvasRenderingContext2D,
    lineNumber: number,
    offset: number = 0,
  ) {
    if (canvasCtx) {
      const companyLogoImage = this.imageManager.getImage("companyLogo");

      if (!companyLogoImage) return;

      const companyLogoDimensions =
        this.imageManager.getImageDimensions("companyLogo");
      canvasCtx.globalCompositeOperation = "overlay";

      const y =
        this.firstLineYPosition +
        (lineNumber - 1) * this.lineHeight +
        offset -
        12;
      canvasCtx.drawImage(
        companyLogoImage!,
        140,
        y,
        companyLogoDimensions?.width || 0,
        companyLogoDimensions?.height || 0,
      );
    }
  }

  private drawCompanyInformationTextLine(
    canvasCtx: CanvasRenderingContext2D,
    text: string,
    lineNumber: number,
    offsetX: number = 0,
    offsetY: number = 0,
  ) {
    const companyInformationText = text;
    const fontSize = this.fontSize;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = white;
    canvasCtx.font = `${fontSize}px ${this.font}`;
    const x =
      (this.width - canvasCtx.measureText(companyInformationText).width) / 2;
    canvasCtx.fillText(
      companyInformationText,
      x + offsetX,
      this.firstLineYPosition + (lineNumber - 1) * this.lineHeight + offsetY,
      300,
    );
  }

  moveCursorUp() {
    if (this.isAnimationEnded) {
      this.selectedOptionIndex =
        (this.selectedOptionIndex + 1) % this.menuOptions.length;
    }
  }

  moveCursorDown() {
    if (this.isAnimationEnded) {
      this.selectedOptionIndex =
        (this.selectedOptionIndex - 1 + this.menuOptions.length) %
        this.menuOptions.length;
    }
  }

  selectOption() {
    if (this.selectedOptionIndex === 0 && this.isAnimationEnded) {
      this.game.setGameStatus("READY");
    }
  }

  animateMenu() {
    if (this.firstLineYPosition > this.targetFirstLineYPosition) {
      this.animationCounter++;
      if (
        this.animationCounter >= this.animationDelay &&
        this.animationCounter % this.animationSpeed === 0
      ) {
        this.firstLineYPosition -= 1;
      }
    } else {
      this.firstLineYPosition = this.targetFirstLineYPosition;
      this.isAnimationEnded = true;
    }
  }
}
