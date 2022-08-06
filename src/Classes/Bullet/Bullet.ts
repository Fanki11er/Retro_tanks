import { v4 as uuidv4 } from 'uuid';
import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { ExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { /*CollisionZone,*/ Direction, StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { Coordinates } from '../BrickWall/BrickWall';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
//import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Bullet {
  private xPos;
  private yPos;
  private width;
  private height;
  private textures: BulletTextures;
  private explosionAnimationFrames;
  private direction;
  private image: HTMLImageElement | null = null;
  private staticObjects;
  private speed;
  // private collisionZone: CollisionZone;
  private hit = false;
  private bullets;
  private id;

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    direction: Direction,
    textures: BulletTextures,
    explosionTextures: ExplosionTextures,
    staticObjects: StaticDrawable[],
    bullets: Bullet[],
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.textures = textures;
    this.direction = direction;
    this.setImageForDirection();
    this.staticObjects = staticObjects;
    this.bullets = bullets;
    this.explosionAnimationFrames = new ExplosionAnimationFrames(30);
    this.speed = 0.5;
    // this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, 4, 4).getCollisionZone();
    this.createExplosionAnimationFrames(explosionTextures);
    this.id = uuidv4();
  }

  public draw(context: CanvasRenderingContext2D) {
    // todo Make collision zone here and use it instead width height and all this staff
    !this.hit && this.update();
    if (!this.hit) {
      this.hit = Utils.checkForCollisionWithBorders(this.direction, this.xPos, this.yPos, this.width, this.height, 312, 312);
    }
    if (!this.hit) {
      this.hit = Utils.checkForCollisionWithObjects(this.direction, this.xPos, this.yPos, this.width, this.height, this.staticObjects);
    }
    !this.hit && this.image && context.drawImage(this.image, this.xPos, this.yPos);

    if (this.hit) {
      // todo Get index of element, find it and check if its hitable
      this.animateExplosion(20, context);
      if (this.explosionAnimationFrames.animationEnded) {
        console.log(this.bullets.length, 'Before');
        this.removeDestroyedBullet();
        console.log(this.bullets.length, 'After');
      }
    }
  }

  private setImageForDirection() {
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

  private update() {
    console.log('Update');
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

  private createExplosionAnimationFrames(explosionTextures: ExplosionTextures) {
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.smallExplosionTexture);
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.mediumExplosionTexture);
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.smallExplosionTexture);
  }
  private animateExplosion(delay: number, ctx: CanvasRenderingContext2D) {
    let image = this.explosionAnimationFrames.animationsFrames[this.explosionAnimationFrames.index];
    if (this.explosionAnimationFrames.index < this.explosionAnimationFrames.animationsFrames.length) {
      const explosionPosition = this.getExplosionPosition();
      ctx.drawImage(
        image,
        explosionPosition.x,
        explosionPosition.y,
        this.explosionAnimationFrames.textureSize,
        this.explosionAnimationFrames.textureSize,
      );
    } else {
      this.explosionAnimationFrames.animationEnded = true;
    }

    this.explosionAnimationFrames.counter += 1;
    if (this.explosionAnimationFrames.counter % delay === 0) {
      this.explosionAnimationFrames.index += 1;
    }
  }

  private getExplosionPosition(): Coordinates {
    switch (this.direction) {
      case 'Forwards': {
        return { x: this.xPos - this.explosionAnimationFrames.textureSize / 2 + this.width / 2, y: this.yPos - 10 };
      }
      case 'Backwards': {
        return {
          x: this.xPos - this.explosionAnimationFrames.textureSize / 2 + this.width / 2,
          y: this.yPos + this.height - this.explosionAnimationFrames.textureSize + 10,
        };
      }
      case 'Left': {
        return {
          x: this.xPos - 10,
          y: this.yPos - this.explosionAnimationFrames.textureSize / 2 + this.width / 2,
        };
      }

      case 'Right': {
        return {
          x: this.xPos + this.width - this.explosionAnimationFrames.textureSize + 10,
          y: this.yPos - this.explosionAnimationFrames.textureSize / 2 + this.width / 2,
        };
      }
      default: {
        return { x: -50, y: -50 };
      }
    }
  }

  private removeDestroyedBullet() {
    const bulletIndex = this.bullets.findIndex((bullet) => {
      return bullet.id === this.id;
    });
    if (bulletIndex >= 0) {
      this.bullets.splice(bulletIndex, 1);
    }
  }

  private checkForCollisionWithObjects() {
    if (this.direction === 'Forwards') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.xPos < collisionZone.B.x &&
          this.xPos + this.width > collisionZone.A.x &&
          this.yPos - 0.2 > collisionZone.A.y &&
          this.yPos - 0.2 < collisionZone.D.y
        ) {
          this.speed = 0;
          this.hit = true;
          return;
        }
      }
    }

    if (this.direction === 'Backwards') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.xPos < collisionZone.B.x &&
          this.xPos + this.width > collisionZone.A.x &&
          this.yPos + this.height + 0.2 > collisionZone.A.y &&
          this.yPos + this.height + 0.2 < collisionZone.D.y
        ) {
          this.speed = 0;
          this.hit = true;
          return;
        }
      }
    }

    if (this.direction === 'Left') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.yPos < collisionZone.D.y &&
          this.yPos + this.height > collisionZone.A.y &&
          this.xPos - 0.2 < collisionZone.D.x &&
          this.xPos - 0.2 > collisionZone.A.x
        ) {
          this.speed = 0;
          this.hit = true;
          return;
        }
      }
    }
    if (this.direction === 'Right') {
      for (let i = 0; i < this.staticObjects.length; i++) {
        const collisionZone = this.staticObjects[i].getCollisionZone();
        if (
          this.yPos < collisionZone.D.y &&
          this.yPos + this.height > collisionZone.A.y &&
          this.xPos + this.width + 0.2 > collisionZone.A.x &&
          this.xPos + this.width + 0.2 < collisionZone.B.x
        ) {
          this.speed = 0;
          this.hit = true;
          return;
        }
      }
    }
  }
}

