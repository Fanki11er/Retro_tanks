import { ImageManager } from "../ImageManager/ImageManager";

export class AnimatedTankIcon {
  private imageManager = new ImageManager();
  private counter = 0;
  private index = 1;
  private animationSpeed: number;

  constructor(
    imageSources: string[],
    width: number,
    height: number,
    animationSpeed: number,
  ) {
    this.animationSpeed = animationSpeed;
    imageSources.forEach((src, index) => {
      this.imageManager.addImage(`tankIcon${index + 1}`, src, width, height);
    });
  }

  draw(
    canvasCtx: CanvasRenderingContext2D,
    deltaTime: number,
    xPos: number,
    yPos: number,
  ) {
    const imagesCount = Object.keys(this.imageManager.images).length;
    this.counter += deltaTime;
    this.reset(imagesCount);

    const imageKey = `tankIcon${this.index}`;
    const image = this.imageManager.getImage(imageKey);

    if (image) {
      canvasCtx.drawImage(image, xPos, yPos, image.width, image.height);
    }

    if (this.counter >= this.animationSpeed) {
      this.index++;
      this.counter = 0;
    }
  }

  private reset(length: number) {
    if (this.index > length) {
      this.index = 1;
    }
  }
}
