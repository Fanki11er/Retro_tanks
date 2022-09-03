import { Coordinates, FindingsTypes, Owner } from '../../Types/Types';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Finding {
  protected counter = 0;
  protected timeIsOut = false;
  protected showImage = true;
  protected timeOut;
  protected isTakenBy: Owner = '';
  protected value = 500;
  protected showTime = 8;
  protected collisionZone;
  constructor(
    protected type: FindingsTypes,
    protected xPos: number,
    protected yPos: number,
    protected image: HTMLImageElement,
    protected size: number,
  ) {
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, size, size);
    this.timeOut = setTimeout(() => {
      this.timeIsOut = true;
    }, this.showTime * 1000);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.counter % 25 === 0) {
      this.showImage = !this.showImage;
    }
    if (this.showImage) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(this.image, this.xPos, this.yPos, 24, 24);
    }
    this.counter++;
  }

  protected cancelTimeout() {
    clearTimeout(this.timeOut);
  }

  getTimeIsOut() {
    return this.timeIsOut;
  }
  getIsTaken() {
    return this.isTakenBy;
  }
  getValue() {
    return this.value;
  }
  getCoordinates() {
    return new Coordinates(this.xPos, this.yPos);
  }

  getType() {
    return this.type;
  }
  getCollisionZone() {
    return this.collisionZone;
  }

  setIsTaken(owner: Owner) {
    this.isTakenBy = owner;
  }
}

