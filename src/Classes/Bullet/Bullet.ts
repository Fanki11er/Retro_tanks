import { v4 as uuidv4 } from 'uuid';
import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { smallExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { AmmunitionType, CollisionZone, Coordinates, Direction, StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { BulletHitZone } from '../BulletHitZone/BulletHitZone';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';

export class Bullet {
  private image: HTMLImageElement | null = null;
  private speed;
  private hit = false;
  public id;
  private collisionWith: StaticDrawable[] = [];

  constructor(
    protected xPos: number,
    protected yPos: number,
    protected width: number,
    protected height: number,
    private direction: Direction,
    private textures: BulletTextures,
    private staticObjects: StaticDrawable[],
    private bullets: Bullet[],
    private explosions: ExplosionAnimationFrames[],
    private ammunitionType: AmmunitionType = 'Standard',
  ) {
    this.setImageForDirection();
    this.speed = 0.5;

    this.id = uuidv4();
  }

  public draw(context: CanvasRenderingContext2D) {
    this.collisionWith = [];
    !this.hit && this.update();
    if (!this.hit) {
      this.hit = Utils.checkForCollisionWithBorders(this.direction, this.xPos, this.yPos, this.width, this.height, 372, 320);
    }
    if (!this.hit) {
      this.collisionWith = Utils.checkForCollisionWithObjects(this.direction, this.xPos, this.yPos, this.width, this.height, this.staticObjects);
    }

    if (this.collisionWith.length && !this.hit) {
      let hitCoordinates;
      if (!this.collisionWith.length) {
        return;
      }
      hitCoordinates = Utils.getPrecisionHitPlace(
        new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
        this.direction,
        this.collisionWith[0].getInnerCoordinates(),
        this.collisionWith[0].getTextureSize(),
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
      const explosionPosition = this.getExplosionPosition();
      this.explosions.push(
        new ExplosionAnimationFrames(
          smallExplosionTextures.animationTexture,
          smallExplosionTextures.textureSize,
          20,
          explosionPosition.x,
          explosionPosition.y,
        ),
      );

      Utils.removeDestroyedElement(this.bullets, this.id);
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

  private getExplosionPosition(): Coordinates {
    switch (this.direction) {
      case 'Forwards': {
        return { x: this.xPos - smallExplosionTextures.textureSize / 2 + this.width / 2, y: this.yPos - 10 };
      }
      case 'Backwards': {
        return {
          x: this.xPos - smallExplosionTextures.textureSize / 2 + this.width / 2,
          y: this.yPos + this.height - smallExplosionTextures.textureSize + 10,
        };
      }
      case 'Left': {
        return {
          x: this.xPos - 10,
          y: this.yPos - smallExplosionTextures.textureSize / 2 + this.width / 2,
        };
      }

      case 'Right': {
        return {
          x: this.xPos + this.width - smallExplosionTextures.textureSize + 10,
          y: this.yPos - smallExplosionTextures.textureSize / 2 + this.width / 2,
        };
      }
      default: {
        return { x: -50, y: -50 };
      }
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

