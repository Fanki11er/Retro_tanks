import { StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';

export class StaticElementsCanvas {
  canvas;
  canvasCtx;
  staticObjects: StaticDrawable[];
  isEagleDestroyed = false;

  constructor(public width: number, public height: number, levelStaticElements: StaticDrawable[]) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx = this.canvas.getContext('2d');
    this.staticObjects = levelStaticElements;
    this.update();
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.checkForChanges();
    ctx.drawImage(this.canvas, 0, 0);
  }

  update() {
    this.canvasCtx?.clearRect(20, 4, 312, 312);
    if (this.canvasCtx) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        if (this.staticObjects[i].isDestroyed && this.staticObjects[i].id !== 'Eagle') {
          Utils.removeDestroyedElement(this.staticObjects, this.staticObjects[i].id);
        } else if (this.staticObjects[i].isDestroyed && this.staticObjects[i].id === 'Eagle') {
          this.isEagleDestroyed = true;
        }
        this.staticObjects[i] && this.staticObjects[i].draw(this.canvasCtx);
      }
    }
  }

  checkForChanges() {
    for (let i = 0; i < this.staticObjects.length; i++) {
      if (this.staticObjects[i].changed) {
        this.update();
        this.staticObjects[i].changed = false;
        return;
      }
    }
  }
}

