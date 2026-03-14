import { Tank } from "../Tank/Tank";
import { bulletTextures } from "../../Textures/BulletTextures/BulletTextures";
import type { Owner, TankTypes, TankTypesTextures } from "../../Types/Types";
import { Game } from "../Game/Game";
import { Brain } from "../Brain/Brain";
import { Value } from "../Value/Value";
import { Bullet } from "../Bullet/Bullet";

export class EnemyTank extends Tank {
  brain: Brain;
  private isSpecial: boolean;
  private timeBlockade: boolean;
  private reloadTimeout: NodeJS.Timeout | null = null;

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    textures: TankTypesTextures,
    tankType: TankTypes,
    isSpecial: boolean,
    timeBlockade: boolean,
    game: Game,
  ) {
    super(xPos, yPos, width, height, textures, tankType, game);
    this.controls.direction = "Backwards";
    this.brain = new Brain(this, game);
    this.setTankSpeed();
    this.spawn(2.5);
    this.isSpecial = isSpecial;
    this.timeBlockade = timeBlockade;
  }

  public update() {
    if (!this.timeBlockade) {
      this.handleImageChange();
      this.brain.update();
    }
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    this.isIndestructible = true;
    setTimeout(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
      this.controls.move = true;
      this.reloadTimeout = setTimeout(() => {
        this.fire();
      }, Math.random() * 1000);
    }, time * 1000);
  }

  protected selectImage(animationSpeed: number) {
    return this.moveAnimation.setImageSpecialTank(
      this.controls.direction,
      this.controls.move,
      animationSpeed,
      this.isSpecial,
    );
  }

  fire() {
    if (!this.isLoading && !this.isSpawning && !this.timeBlockade) {
      const { x, y } = this.setPositionOfBullet(4);
      this.game.bullets.push(
        new Bullet(
          x,
          y,
          2,
          2,
          this.controls.direction,
          bulletTextures,
          "",
          this.game,
          "EnemyBullet",
        ),
      );
      this.isLoading = true;

      this.reloadTimeout = setTimeout(
        () => {
          this.isLoading = false;
          this.fire();
        },
        this.reloadTime * Math.random() * 2000 + 1000,
      );
    }
  }

  public processHit(hitBy: Owner): void {
    if (!this.isIndestructible) {
      this.isDestroyed = { type: this.tankType, destroyedBy: hitBy };
      this.handleDestruction();
    }
  }

  setIsTimeBlocked(isBlockedByTime: boolean) {
    this.timeBlockade = isBlockedByTime;

    if (isBlockedByTime === false) {
      this.fire();
    }

    if (isBlockedByTime && this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
  }

  private handleDestruction() {
    if (this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
      this.reloadTimeout = null;
    }
    if (this.isSpecial) {
      this.game.generateFinding();
    }
    this.handleExplosion();
    if (this.isDestroyed?.destroyedBy) {
      this.game.values.push(
        new Value(this.getValue(), this.xPos, this.yPos + 12, 1, 2.5),
      );
      this.game.destroyedEnemyTanksList.push(this.isDestroyed);
    }
    const index = this.game.enemyTanks.indexOf(this);
    this.game.enemyTanks.splice(index, 1);
  }

  getValue() {
    //!! Make standardized values (enum will be great)
    switch (this.tankType) {
      case "Small": {
        return 100;
      }
      case "Fast": {
        return 200;
      }
      default: {
        return 0;
      }
    }
  }

  setTankSpeed() {
    switch (this.tankType) {
      case "Fast": {
        this.speed = 0.4;
        break;
        //!! 0,5
      }
      default: {
        this.speed = 0.2;
      }
    }
  }

  getTankType() {
    return this.tankType;
  }

  getIsSpecial() {
    return this.isSpecial;
  }

  getIsBlocked() {
    return this.isBlockedBy;
  }
}
