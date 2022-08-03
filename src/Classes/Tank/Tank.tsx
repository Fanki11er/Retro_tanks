import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { StaticDrawable } from '../../Types/Types';
import { Coordinates } from '../BrickWall/BrickWall';
import { Bullet } from '../Bullet/Bullet';
import { Controls } from '../Controls/Controls';

export class Tank {
  xPos;
  yPos;
  width;
  height;
  controls;
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
    this.checkForCollisionWithObjects();

    if (this.controls.forwards) {
      this.setImage(this.textures.topDirectionTexture);

      if (!this.isBlocked) {
        this.yPos -= 0.15;
      }
    }
    if (this.controls.backwards) {
      this.setImage(this.textures.downDirectionTexture);

      if (!this.isBlocked) {
        this.yPos += 0.15;
      }
    }
    if (this.controls.left) {
      this.setImage(this.textures.leftDirectionTexture);

      if (!this.isBlocked) {
        this.xPos -= 0.15;
      }
    }
    if (this.controls.right) {
      this.setImage(this.textures.rightDirectionTexture);

      if (!this.isBlocked) {
        this.xPos += 0.15;
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
    if (this.controls.forwards) {
      if (this.yPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.backwards) {
      if (this.yPos + this.height >= 312) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.left) {
      if (this.xPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.right) {
      if (this.xPos + this.width >= 312) {
        this.isBlocked = true;
        return;
      }
    }
  }

  checkForCollisionWithObjects() {
    if (this.controls.forwards) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        console.log(this.staticObjects.length);
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

    if (this.controls.backwards) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        console.log(this.staticObjects.length);
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

    if (this.controls.left) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        console.log(this.staticObjects.length);
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

    if (this.controls.right) {
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
      this.bullets.push(new Bullet(x, y, 4, 4, this.controls.lastDirection, bulletTextures, this.staticObjects));
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
    }
  }

  private checkPositionOfTheBarrel() {
    if (this.controls.lastDirection === 'Forwards') {
      return new Coordinates(this.xPos + this.width / 2 - 2, this.yPos - 4);
    }
    if (this.controls.lastDirection === 'Backwards') {
      return new Coordinates(this.xPos + this.width / 2 - 2, this.yPos + this.height);
    }
    if (this.controls.lastDirection === 'Left') {
      return new Coordinates(this.xPos - 4, this.yPos + this.height / 2 - 2);
    }
    if (this.controls.lastDirection === 'Right') {
      return new Coordinates(this.xPos + this.width, this.yPos + this.height / 2 - 2);
    }
    return new Coordinates(-20, -20);
  }
}

