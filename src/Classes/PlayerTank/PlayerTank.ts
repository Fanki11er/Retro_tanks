import { StaticDrawable, TankTypesTextures } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';

import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { Tank } from '../Tank/Tank';

export class PlayerTank extends Tank {
  constructor(
    public xPos: number,
    public yPos: number,
    protected width: number,
    protected height: number,
    textures: TankTypesTextures,
    protected staticObjects: StaticDrawable[],
    protected bullets: Bullet[],
    protected explosions: ExplosionAnimationFrames[],
  ) {
    super(xPos, yPos, width, height, textures, staticObjects, bullets, explosions);
    this.madeIndestructible(4000);
    this.spawn(2500);
  }

  protected madeIndestructible(time: number) {
    this.isIndestructible = true;
    setTimeout(() => {
      this.isIndestructible = false;
    }, time);
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
    }, time);
  }
}

