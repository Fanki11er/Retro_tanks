import { v4 as uuidv4 } from 'uuid';
import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { ExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { AmmunitionType, CollisionZone, Direction, StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { Coordinates } from '../BrickWall/BrickWall';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { BulletHitZone } from '../BulletHitZone/BulletHitZone';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

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
  private hit = false;
  private bullets;
  private id;
  private ammunitionType;
  private collisionWith: StaticDrawable[] = [];

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
    ammunitionType: AmmunitionType = 'Standard',
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
    this.createExplosionAnimationFrames(explosionTextures);
    this.ammunitionType = ammunitionType;
    this.id = uuidv4();
  }

  public draw(context: CanvasRenderingContext2D) {
    this.collisionWith = [];
    !this.hit && this.update();
    if (!this.hit) {
      this.hit = Utils.checkForCollisionWithBorders(this.direction, this.xPos, this.yPos, this.width, this.height, 312, 312);
    }
    if (!this.hit) {
      this.collisionWith = Utils.checkForCollisionWithObjects(this.direction, this.xPos, this.yPos, this.width, this.height, this.staticObjects);
    }

    if (this.collisionWith.length && !this.hit) {
      let hitCoordinates;
      //const hitElementIndex = Utils.findHitElementIndex(this.collisionWith, this.staticObjects);
      /*if (hitElementIndex. < 0) {
        return;
      }*/
      if (!this.collisionWith.length) {
        return;
      }
      hitCoordinates = this.collisionWith[0].getPrecisionHitPlace(
        new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
        this.direction,
      );

      if (hitCoordinates) {
        this.hit = true;
        let elementsInExplosionRange: StaticDrawable[] = [];
        let bulletHitZone: CollisionZone;
        if (this.direction === 'Forwards') {
          bulletHitZone = new BulletHitZone(hitCoordinates, 0, 2, 22, 10).getCollisionZone();
          elementsInExplosionRange = this.checkForExplosionRange(bulletHitZone);
        } else if (this.direction === 'Backwards') {
          bulletHitZone = new BulletHitZone(hitCoordinates, 0, -2, 22, 10).getCollisionZone();
          elementsInExplosionRange = this.checkForExplosionRange(bulletHitZone);
        } else if (this.direction === 'Left') {
          bulletHitZone = new BulletHitZone(hitCoordinates, 2, 0, 10, 22).getCollisionZone();
          elementsInExplosionRange = this.checkForExplosionRange(bulletHitZone);
        } else if (this.direction === 'Right') {
          bulletHitZone = new BulletHitZone(hitCoordinates, -2, 0, 10, 22).getCollisionZone();
          elementsInExplosionRange = this.checkForExplosionRange(bulletHitZone);
        } else {
          bulletHitZone = new BulletHitZone(hitCoordinates, 0, 0, 6, 22).getCollisionZone();
        }

        for (let i = 0; i < elementsInExplosionRange.length; i++) {
          const collisionElementIndex = Utils.findHitElementIndex(elementsInExplosionRange[i].id, this.staticObjects);
          if (collisionElementIndex >= 0) {
            this.staticObjects[collisionElementIndex].processHit(this.ammunitionType, bulletHitZone, this.yPos);
          }
        }
      }
    }
    !this.hit && this.image && context.drawImage(this.image, this.xPos, this.yPos);

    if (this.hit) {
      this.animateExplosion(20, context);
      if (this.explosionAnimationFrames.animationEnded) {
        this.removeDestroyedBullet();
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

  checkForExplosionRange(bulletHitZone: CollisionZone) {
    const collisions = [];

    for (let i = 0; i < this.staticObjects.length; i++) {
      const collisionZone = this.staticObjects[i].getCollisionZone();
      if (
        bulletHitZone.A.x < collisionZone.B.x &&
        bulletHitZone.B.x > collisionZone.A.x &&
        bulletHitZone.A.y < collisionZone.C.y &&
        bulletHitZone.C.y > collisionZone.A.y
      ) {
        collisions.push(this.staticObjects[i]);
      }
    }
    return collisions;
  }
}

