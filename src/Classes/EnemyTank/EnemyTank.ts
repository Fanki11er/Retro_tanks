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
    private isSpecial: boolean,
  ) {
    super(xPos, yPos, width, height, textures, staticObjects, bullets);
    this.controls.direction = 'Backwards';
    this.spawn(2500);
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
      //this.controls.move = true;
    }, time);
  }
  protected selectImage(animationSpeed: number) {
    return this.moveAnimation.setImageSpecialTank(this.controls.direction, this.controls.move, animationSpeed, this.isSpecial);
  }

  fire(): void {}
  public processHit(): void {
    this.isDestroyed = true;
  }
  getIsSpecial() {
    return this.isSpecial;
  }
  getValue() {
    //!! Make standardized values
    switch (this.tankType) {
      case 'Small': {
        return 100;
      }
      default: {
        return 0;
      }
    }
  }

  getTankType() {
    return this.tankType;
  }
}

