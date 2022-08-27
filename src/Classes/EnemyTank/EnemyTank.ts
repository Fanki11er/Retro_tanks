import { StaticDrawable, TankTypes, TankTypesTextures } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { Tank } from '../Tank/Tank';

export class EnemyTank extends Tank {
  constructor(
    public xPos: number,
    public yPos: number,
    protected width: number,
    protected height: number,
    textures: TankTypesTextures,
    protected staticObjects: StaticDrawable[],
    protected bullets: Bullet[],
    protected explosions: ExplosionAnimationFrames[],
    protected tankType: TankTypes,
  ) {
    super(xPos, yPos, width, height, textures, staticObjects, bullets, explosions);
    this.controls.direction = 'Backwards';
    this.spawn(2500);
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
    }, time);
  }
}

