import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { explosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { Coordinates } from '../BrickWall/BrickWall';
import { Bullet } from '../Bullet/Bullet';
import { Controls } from '../Controls/Controls';

export class Tank {
  xPos;
  yPos;
  width;
  height;
  controls;
  private speed = 0.15;
  textures: TankTextures;
  image;
  isBlocked;
  staticObjects;
  bullets;
  private isLoading;

  constructor(xPos: number, yPos: number, width: number, height: number, textures: TankTextures, staticObjects: StaticDrawable[], bullets: Bullet[]) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
    this.textures = textures;
    this.image = textures.topDirectionTexture;
    this.isBlocked = false;
    this.staticObjects = staticObjects;
    this.bullets = bullets;
    this.isLoading = false;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xPos, this.yPos);
  }

  public update() {
    this.isBlocked = false;
    this.checkForCollisionWithBorders();
    if (!this.isBlocked) {
      this.isBlocked = Utils.checkForCollisionWithObjects(this.controls.direction, this.xPos, this.yPos, this.width, this.height, this.staticObjects);
    }
    if (this.isBlocked) {
      return;
    }

    if (this.controls.direction === 'Forwards') {
      this.setImage(this.textures.topDirectionTexture);

      if (this.controls.move) {
        this.yPos -= this.speed;
      }
    }
    if (this.controls.direction === 'Backwards') {
      this.setImage(this.textures.downDirectionTexture);

      if (this.controls.move) {
        this.yPos += this.speed;
      }
    }
    if (this.controls.direction === 'Left') {
      this.setImage(this.textures.leftDirectionTexture);

      if (this.controls.move) {
        this.xPos -= this.speed;
      }
    }
    if (this.controls.direction === 'Right') {
      this.setImage(this.textures.rightDirectionTexture);

      if (this.controls.move) {
        this.xPos += this.speed;
      }
    }
  }

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }

  checkForCollisionWithBorders() {
    this.isBlocked = false;
    if (this.controls.direction === 'Forwards') {
      if (this.yPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.direction === 'Backwards') {
      if (this.yPos + this.height >= 312) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.direction === 'Left') {
      if (this.xPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.direction === 'Right') {
      if (this.xPos + this.width >= 312) {
        this.isBlocked = true;
        return;
      }
    }
  }

  checkForCollisionWithObjects() {
    if (this.controls.direction === 'Forwards') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.xPos < collisionZone.B.x &&
          this.xPos + this.width > collisionZone.A.x &&
          this.yPos - 0.2 > collisionZone.A.y &&
          this.yPos - 0.2 < collisionZone.D.y
        ) {
          this.isBlocked = true;
          return;
        }
      }
    }

    if (this.controls.direction === 'Backwards') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.xPos < collisionZone.B.x &&
          this.xPos + this.width > collisionZone.A.x &&
          this.yPos + this.height + 0.2 > collisionZone.A.y &&
          this.yPos + this.height + 0.2 < collisionZone.D.y
        ) {
          this.isBlocked = true;
          return;
        }
      }
    }

    if (this.controls.direction === 'Left') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.yPos < collisionZone.D.y &&
          this.yPos + this.height > collisionZone.A.y &&
          this.xPos - 0.2 < collisionZone.D.x &&
          this.xPos - 0.2 > collisionZone.A.x
        ) {
          this.isBlocked = true;
          return;
        }
      }
    }

    if (this.controls.direction === 'Right') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.yPos < collisionZone.D.y &&
          this.yPos + this.height > collisionZone.A.y &&
          this.xPos + this.width + 0.2 > collisionZone.A.x &&
          this.xPos + this.width + 0.2 < collisionZone.B.x
        ) {
          this.isBlocked = true;
          return;
        }
      }
    }
  }

  fire() {
    if (!this.isLoading) {
      const { x, y } = this.checkPositionOfTheBarrel();
      this.bullets.push(new Bullet(x, y, 4, 4, this.controls.direction, bulletTextures, explosionTextures, this.staticObjects, this.bullets));
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
    }
  }

  private checkPositionOfTheBarrel() {
    if (this.controls.direction === 'Forwards') {
      return new Coordinates(this.xPos + this.width / 2 - 2, this.yPos - 4);
    }
    if (this.controls.direction === 'Backwards') {
      return new Coordinates(this.xPos + this.width / 2 - 2, this.yPos + this.height);
    }
    if (this.controls.direction === 'Left') {
      return new Coordinates(this.xPos - 4, this.yPos + this.height / 2 - 2);
    }
    if (this.controls.direction === 'Right') {
      return new Coordinates(this.xPos + this.width, this.yPos + this.height / 2 - 2);
    }
    return new Coordinates(-20, -20);
  }
}

