import gameOverImageSrc from "../../assets/images/GameOverScreen/GameOver.png";

export class GameOverScreen {
  private counter = 0;
  animationEnded = false;
  private width;
  private height;
  private imageWidth = 300;
  private imageHeight = 150;
  private gameOverImage: HTMLImageElement;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.gameOverImage = new Image();
    this.gameOverImage.src = gameOverImageSrc;
  }

  animate(canvasCtx: CanvasRenderingContext2D, timeOnScreen: number) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";

      canvasCtx.globalCompositeOperation = "overlay";
      const x = (this.width - this.imageWidth) / 2;
      const y = (this.height - this.imageHeight) / 2;
      canvasCtx.drawImage(
        this.gameOverImage,
        x,
        y,
        this.imageWidth,
        this.imageHeight,
      );

      this.counter++;
      if (this.counter % timeOnScreen === 0 && !this.animationEnded) {
        this.animationEnded = true;
      }
    }
    return this.animationEnded;
  }

  reset() {
    this.counter = 0;
    this.animationEnded = false;
  }
}
