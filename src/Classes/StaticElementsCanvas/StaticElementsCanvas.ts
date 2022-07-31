import { StaticDrawable } from '../../Types/Types';

export class StaticElementsCanvas {
  width;
  height;
  canvas;
  canvasCtx;
  staticObjects: StaticDrawable[];

  constructor(width: number, height: number, levelStaticElements: StaticDrawable[]) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx = this.canvas.getContext('2d');
    this.staticObjects = levelStaticElements;
    this.update();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvas, 0, 0);
  }

  update() {
    if (this.canvasCtx) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        this.staticObjects[i].draw(this.canvasCtx);
      }
    }
  }
}

