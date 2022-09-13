import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { Owner, TankTypes, TankTypesTextures } from '../../Types/Types';
import { EnemyBullet } from '../EnemyBullet/EnemyBullet';
import { Game } from '../Game/Game';
import { Tank } from '../Tank/Tank';
import { Value } from '../Value/Value';

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
    super(xPos, yPos, width, height, textures, tankType, game);
    this.controls.direction = 'Backwards';
    this.spawn(2.5);
  }

  public update() {
    if (!this.timeBlockade) {
      this.handleCollisionsWithBorders();
      this.handleCollisionsWithStaticObjects();
      this.handleCollisionsWithOtherTanks(this.game.enemyTanks);
      this.handleCollisionsWithOtherTanks(this.game.players.getActivePlayersTanks());
      this.handleImageChange();
    }
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
      this.controls.move = true; //!Temporary
      this.fire(); //! Temporary
    }, time * 1000);
  }
  protected selectImage(animationSpeed: number) {
    return this.moveAnimation.setImageSpecialTank(this.controls.direction, this.controls.move, animationSpeed, this.isSpecial);
  }

  fire() {
    if (!this.isLoading && !this.isSpawning) {
      const { x, y } = this.setPositionOfBullet(4);
      this.game.bullets.push(new EnemyBullet(x, y, 2, 2, this.controls.direction, bulletTextures, 'Standard', '', this.game));
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, this.reloadTime * 1000);
    }
  }

  public processHit(hitBy: Owner): void {
    this.isDestroyed = { type: this.tankType, destroyedBy: hitBy };
    this.handleDestruction();
  }

  setIsTimeBlocked(time: number) {
    this.timeBlockade = true;
    setTimeout(() => {
      this.timeBlockade = false;
    }, time * 1000);
  }

  private handleDestruction() {
    if (this.isSpecial) {
      this.game.generateFinding();
    }
    this.handleExplosion();
    if (this.isDestroyed?.destroyedBy) {
      this.game.values.push(new Value(this.getValue(), this.xPos, this.yPos + 12, 1, 2.5));
      this.game.destroyedEnemyTanksList.push(this.isDestroyed);
    }
    const index = this.game.enemyTanks.indexOf(this);
    this.game.enemyTanks.splice(index, 1);
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

  getIsSpecial() {
    return this.isSpecial;
  }
}

