import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { AnimationFrames } from '../AnimationFrame/AnimationFrame';
import { Coordinates } from '../BrickWall/BrickWall';
import { Bullet } from '../Bullet/Bullet';
import { Controls } from '../Controls/Controls';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import indestructibleTextures from '../IndestructibleTextures/IndestructibleTextures';
import spawnPointTextures from '../SpawnPointTextures/SpawnPointTextures';

export class Tank {
  xPos;
  yPos;
  private width;
  private height;
  controls;
  private speed = 0.15;
  private textures: TankTextures;
  private image;
  private isBlockedBy;
  private staticObjects;
  private bullets;
  private isLoading;
  private isSpawning;
  private isIndestructible = true;
  private spawnAnimationFrames;
  private indestructibleAnimationFrames;

  constructor(xPos: number, yPos: number, width: number, height: number, textures: TankTextures, staticObjects: StaticDrawable[], bullets: Bullet[]) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
    this.textures = textures;
    this.image = textures.topDirectionTexture;
    this.isBlockedBy = false;
    this.staticObjects = staticObjects;
    this.bullets = bullets;
    this.isLoading = false;
    this.isSpawning = true;
    this.spawnAnimationFrames = new AnimationFrames(spawnPointTextures.animationTexture, spawnPointTextures.textureSize);
    this.indestructibleAnimationFrames = new AnimationFrames(indestructibleTextures.animationTexture, indestructibleTextures.textureSize);
    this.madeIndestructible(4000);
    this.spawn(2500);
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.isSpawning) {
      this.spawnAnimationFrames.animateFrames(20, context, this.xPos, this.yPos, this.isSpawning, 0);
    } else if (!this.isSpawning && this.isIndestructible) {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 22, 22);
      this.indestructibleAnimationFrames.animateFrames(15, context, this.xPos - 2, this.yPos - 2, this.isIndestructible, 0);
    } else {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 22, 22);
    }
  }

  public update() {
    this.isBlockedBy = false;
    this.isBlockedBy = Utils.checkForCollisionWithBorders(this.controls.direction, this.xPos, this.yPos, this.width, this.height, 372, 320);

    if (!this.isBlockedBy) {
      const collisionWith = Utils.checkForCollisionWithObjects(
        this.controls.direction,
        this.xPos,
        this.yPos,
        this.width,
        this.height,
        this.staticObjects,
      );
      if (collisionWith.length) {
        for (let i = 0; i < collisionWith.length; i++) {
          if (!this.isBlockedBy) {
            this.isBlockedBy = !!collisionWith[i].getPrecisionCollisionPlace(
              new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
              this.controls.direction,
            );
          }
        }
      }
    }

    if (this.controls.direction === 'Forwards') {
      this.setImage(this.textures.topDirectionTexture);

      if (!this.isBlockedBy && this.controls.move) {
        this.yPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Backwards') {
      this.setImage(this.textures.downDirectionTexture);

      if (!this.isBlockedBy && this.controls.move) {
        this.yPos += this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Left') {
      this.setImage(this.textures.leftDirectionTexture);

      if (!this.isBlockedBy && this.controls.move) {
        this.xPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Right') {
      this.setImage(this.textures.rightDirectionTexture);

      if (!this.isBlockedBy && this.controls.move) {
        this.xPos += this.speed;
      }
      return;
    }
  }

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }

  fire() {
    if (!this.isLoading) {
      const { x, y } = this.setPositionOfBullet(4);
      this.bullets.push(new Bullet(x, y, 2, 2, this.controls.direction, bulletTextures, this.staticObjects, this.bullets));
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
    }
  }

  private setPositionOfBullet(bulletWidth: number) {
    if (this.controls.direction === 'Forwards') {
      return new Coordinates(this.xPos + this.width / 2 - 1, this.yPos);
    }
    if (this.controls.direction === 'Backwards') {
      return new Coordinates(this.xPos + this.width / 2 - 1, this.yPos + this.height - bulletWidth);
    }
    if (this.controls.direction === 'Left') {
      return new Coordinates(this.xPos, this.yPos + this.height / 2 - 1);
    }
    if (this.controls.direction === 'Right') {
      return new Coordinates(this.xPos + this.width - bulletWidth, this.yPos + this.height / 2 - 1);
    }
    return new Coordinates(-20, -20);
  }

  private madeIndestructible(time: number) {
    this.isIndestructible = true;
    setTimeout(() => {
      this.isIndestructible = false;
    }, time);
  }

  private spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
    }, time);
  }
}

