import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { ExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { CollisionZone, Direction, StaticDrawable } from '../../Types/Types';
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
  };
  direction;
  image: HTMLImageElement | null = null;
  staticObjects;
  speed;
  collisionZone: CollisionZone;
  hit = false;
  bullets;
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
  }

  public draw(context: CanvasRenderingContext2D) {
    if (!this.hit) {
      this.update();
      this.checkForCollisionWithBorders();
      this.image && context.drawImage(this.image, this.xPos, this.yPos);
    } else {
      this.animateExplosion(20, context);
    }
    if (this.explosionAnimationFrames.animationEnded) {
      this.bullets.pop();
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

  private createExplosionAnimationFrames(explosionTextures: ExplosionTextures) {
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.smallExplosionTexture);
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.mediumExplosionTexture);
    this.explosionAnimationFrames.animationsFrames.push(explosionTextures.smallExplosionTexture);
  }
  private animateExplosion(delay: number, ctx: CanvasRenderingContext2D) {
    let image = this.explosionAnimationFrames.animationsFrames[this.explosionAnimationFrames.index];
    if (this.explosionAnimationFrames.index < this.explosionAnimationFrames.animationsFrames.length) {
      ctx.drawImage(image, 50, -10);
    } else {
      this.explosionAnimationFrames.animationEnded = true;
    }

    this.explosionAnimationFrames.counter += 1;
    if (this.explosionAnimationFrames.counter % delay === 0) {
      this.explosionAnimationFrames.index += 1;
    }
  }
}

