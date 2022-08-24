import { largeExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { StaticDrawable } from '../../Types/Types';
import { AnimationFrames } from '../AnimationFrame/AnimationFrame';
import { eagleTextures } from '../EagleTextures/EagleTextures';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Eagle implements StaticDrawable {
  id;
  xPos;
  yPos;
  width;
  height;
  isDestroyed;
  textures = eagleTextures;
  collisionZone;
  changed;
  explosionAnimationFrames;

  constructor(xPos: number, yPos: number, size: number) {
    this.id = 'Eagle';
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = size;
    this.height = size;
    this.changed = false;
    this.isDestroyed = false;
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, this.width, this.height);
    this.explosionAnimationFrames = new AnimationFrames(largeExplosionTextures.animationTexture, largeExplosionTextures.textureSize);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.isDestroyed) {
      ctx.drawImage(eagleTextures.notDamagedTexture, this.xPos, this.yPos);
    } else {
      ctx.drawImage(eagleTextures.damagedTexture, this.xPos, this.yPos);
    }
  }

  public getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }
  getPrecisionCollisionPlace() {
    return { x: this.xPos, y: this.yPos };
  }

  getInnerCoordinates() {
    return [{ x: this.xPos, y: this.yPos }];
  }
  getTextureSize() {
    return this.textures.textureSize;
  }

  processHit() {
    this.isDestroyed = true;
    this.changed = true;
    return '';
  }
}

