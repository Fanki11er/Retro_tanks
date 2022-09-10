import { Owner, TankTypes, TankTypesTextures } from '../../Types/Types';
import { Game } from '../Game/Game';
import { Tank } from '../Tank/Tank';

export class EnemyTank extends Tank {
  constructor(
    public xPos: number,
    public yPos: number,
    protected width: number,
    protected height: number,
    textures: TankTypesTextures,
    protected tankType: TankTypes,
    private isSpecial: boolean,
    private timeBlockade: boolean,
    protected game: Game,
  ) {
    super(xPos, yPos, width, height, textures, game);
    this.controls.direction = 'Backwards';
    this.spawn(2.5);
  }

  public update() {
    if (!this.timeBlockade) {
      this.handleCollisionsWithBorders();
      this.handleCollisionsWithStaticObjects();
      this.handleImageChange();
    }
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
      this.controls.move = true;
    }, time * 1000);
  }
  protected selectImage(animationSpeed: number) {
    return this.moveAnimation.setImageSpecialTank(this.controls.direction, this.controls.move, animationSpeed, this.isSpecial);
  }

  fire(): void {}

  public processHit(hitBy: Owner): void {
    this.isDestroyed = { type: this.tankType, destroyedBy: hitBy };
  }
  getIsSpecial() {
    return this.isSpecial;
  }
  getValue() {
    //!! Make standardized values (enum will be great)
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

  setIsTimeBlocked(time: number) {
    this.timeBlockade = true;
    setTimeout(() => {
      this.timeBlockade = false;
    }, time * 1000);
  }
}

