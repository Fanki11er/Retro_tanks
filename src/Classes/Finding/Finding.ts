import {
  FINDING_BLINKING_INTERVAL,
  FINDING_BLINKING_START_TIME,
  FINDING_SHOW_TIME,
} from "../../constants";
import { Coordinates } from "../../Types/Types";
import type { FindingsTypes, Owner } from "../../Types/Types";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";
import { Timer } from "../Timer/Timer";

export class Finding {
  protected counter = 0;
  protected elapsedTime = 0;
  protected timeIsOut = false;
  protected showImage = true;
  protected isTakenBy: Owner | "" = "";
  protected value = 500;
  protected showTime = FINDING_SHOW_TIME;
  protected collisionZone;
  protected type: FindingsTypes;
  protected xPos: number;
  protected yPos: number;
  protected image: HTMLImageElement;
  protected size: number;
  protected showingTimer = new Timer();
  constructor(
    type: FindingsTypes,
    xPos: number,
    yPos: number,
    image: HTMLImageElement,
    size: number,
  ) {
    this.type = type;
    this.xPos = xPos;
    this.yPos = yPos;
    this.image = image;
    this.size = size;
    this.collisionZone = new ElementCollisionZone(
      { x: xPos, y: yPos },
      size,
      size,
    );

    this.showingTimer.start(() => {
      this.timeIsOut = true;
    }, this.showTime);
  }
  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.elapsedTime = this.showingTimer.getCurrentTime();
    if (
      this.elapsedTime >= FINDING_BLINKING_START_TIME &&
      this.counter >= FINDING_BLINKING_INTERVAL
    ) {
      this.showImage = !this.showImage;
      this.counter = 0;
    }
    if (this.showImage) {
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(this.image, this.xPos, this.yPos, this.size, this.size);
    }
    this.counter += deltaTime;
    this.showingTimer.update(deltaTime);
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
