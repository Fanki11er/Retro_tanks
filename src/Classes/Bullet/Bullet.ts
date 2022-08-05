import { v4 as uuidv4 } from 'uuid';
import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { ExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { CollisionZone, Direction, StaticDrawable } from '../../Types/Types';
import { Coordinates } from '../BrickWall/BrickWall';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Bullet {
  xPos;
  yPos;
  width;
  height;
  textures: BulletTextures;
  explosionAnimationFrames = {
    animationsFrames: [] as HTMLImageElement[],
    index: 0,
    counter: 0,
    animationEnded: false,
    textureSize: 30,
  };
  direction;
  image: HTMLImageElement | null = null;
  staticObjects;
  speed;
  collisionZone: CollisionZone;
  hit = false;
  bullets;
  id;
  // Todo: Add collisions with static elements
  // Todo: Add explosions after collisions

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
    this.speed = 0.5;
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, 4, 4).getCollisionZone();
    this.createExplosionAnimationFrames(explosionTextures);
    this.id = uuidv4();
  }

  public draw(context: CanvasRenderingContext2D) {
    if (!this.hit) {
      this.update();
      this.checkForCollisionWithBorders();
      this.checkForCollisionWithObjects();
      this.image && context.drawImage(this.image, this.xPos, this.yPos);
    } else {
      this.animateExplosion(20, context);
    }
    if (this.explosionAnimationFrames.animationEnded) {
      console.log(this.bullets.length, 'Before');
      this.removeDestroyedBullet();
      console.log(this.bullets.length, 'After');
    }
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
        this.hit = true;
        return;
      }
    }
    if (this.direction === 'Backwards') {
      if (this.yPos + this.height >= 312) {
        this.speed = 0;
        this.hit = true;
        return;
      }
    }
    if (this.direction === 'Left') {
      if (this.xPos <= 0) {
        this.speed = 0;
        this.hit = true;
        return;
      }
    }
    if (this.direction === 'Right') {
      if (this.xPos + this.width >= 312) {
        this.speed = 0;
        this.hit = true;
        return;
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
        console.log(this.staticObjects.length);
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
        console.log(this.staticObjects.length);
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

