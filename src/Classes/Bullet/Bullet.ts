import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { CollisionZone, Direction, StaticDrawable } from '../../Types/Types';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Bullet {
  xPos;
  yPos;
  width;
  height;
  textures: BulletTextures;
  direction;
  image: HTMLImageElement | null = null;
  staticObjects;
  speed;
  collisionZone: CollisionZone;
  // Todo: Add Collision zone

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    direction: Direction,
    textures: BulletTextures,
    staticObjects: StaticDrawable[],
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.textures = textures;
    this.direction = direction;
    this.setImageForDirection();
    this.staticObjects = staticObjects;
    this.speed = 0.5;
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, 4, 4).getCollisionZone();
  }

  public draw(context: CanvasRenderingContext2D) {
    this.update();
    this.checkForCollisionWithBorders();
    this.image && context.drawImage(this.image, this.xPos, this.yPos);
  }

  setImageForDirection() {
    switch (this.direction) {
      case 'Forwards': {
        this.image = this.textures.upDirectionTexture;
        break;
      }
      case 'Backwards': {
        this.image = this.textures.downDirectionTexture;
        break;
      }
      case 'Left': {
        this.image = this.textures.leftDirectionTexture;
        break;
      }
      case 'Right': {
        this.image = this.textures.rightDirectionTexture;
      }
    }
  }

  update() {
    switch (this.direction) {
      case 'Forwards': {
        this.yPos -= this.speed;
        break;
      }
      case 'Backwards': {
        this.yPos += this.speed;
        break;
      }
      case 'Left': {
        this.xPos -= this.speed;
        break;
      }
      case 'Right': {
        this.xPos += this.speed;
        break;
      }
    }
  }

  checkForCollisionWithBorders() {
    if (this.direction === 'Forwards') {
      if (this.yPos <= 0) {
        this.speed = 0;
        return;
      }
    }
    if (this.direction === 'Backwards') {
      if (this.yPos + this.height >= 312) {
        return;
      }
    }
    if (this.direction === 'Left') {
      if (this.xPos <= 0) {
        return;
      }
    }
    if (this.direction === 'Right') {
      if (this.xPos + this.width >= 312) {
        return;
      }
    }
  }
}

