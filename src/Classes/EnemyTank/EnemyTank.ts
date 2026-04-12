import { Tank } from "../Tank/Tank";
import { bulletTextures } from "../../Textures/BulletTextures/BulletTextures";
import type {
  EnemyTankTypes,
  Owner,
  TankTypesTextures,
} from "../../Types/Types";
import { Game } from "../Game/Game";
import { Brain } from "../Brain/Brain";
import { Value } from "../Value/Value";
import { Bullet } from "../Bullet/Bullet";
import { SPAWN_ANIMATION_TIME, ENEMY_TANKS_SETTINGS } from "../../constants";
import { Utils } from "../../Utils/Utils";

export class EnemyTank extends Tank {
  brain: Brain;
  private isSpecial: boolean;
  private timeBlockade: boolean;
  private reloadDelay = 2;
  //private reloadTimeout: NodeJS.Timeout | null = null;

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    textures: TankTypesTextures,
    tankType: EnemyTankTypes,
    isSpecial: boolean,
    timeBlockade: boolean,
    game: Game,
  ) {
    super(xPos, yPos, width, height, textures, tankType, game);
    this.controls.direction = "Backwards";
    this.brain = new Brain(this, game);
    this.setTankSpeed();
    //!!!!!!!!!!!!!!!
    this.spawn(SPAWN_ANIMATION_TIME);
    this.isSpecial = isSpecial;
    this.timeBlockade = timeBlockade;
  }

  public update(deltaTime: number) {
    if (!this.timeBlockade) {
      this.handleImageChange(deltaTime);
      this.brain.update();
      this.loadingTimer.update(deltaTime);
    }
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    this.isIndestructible = true;

    this.spawnTimer.start(() => {
      this.isSpawning = false;
      this.isIndestructible = false;
      this.controls.move = true;

      this.loadingTimer.start(
        () => {
          this.fire();
        },
        this.reloadTime * Utils.generateRandomNumber(1, 3),
        true,
      );

      // this.reloadTimeout = setTimeout(() => {
      //   this.fire();
      // }, Math.random() * 1000);
    }, time);

    // setTimeout(() => {
    //   this.isSpawning = false;
    //   this.isIndestructible = false;
    //   this.controls.move = true;
    //   this.reloadTimeout = setTimeout(() => {
    //     this.fire();
    //   }, Math.random() * 1000);
    // }, time * 1000);
  }

  protected selectImage(deltaTime: number, animationSpeed: number) {
    return this.moveAnimation.setImageSpecialTank(
      this.controls.direction,
      this.controls.move,
      deltaTime,
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
          this.tankType,
        ),
      );
      this.isLoading = true;

      this.loadingTimer.start(
        () => {
          this.isLoading = false;
          this.fire();
        },
        this.reloadTime * Utils.generateRandomNumber(2, 4),
        true,
      );

      // this.reloadTimeout = setTimeout(
      //   () => {
      //     this.isLoading = false;
      //     this.fire();
      //   },
      //   this.reloadTime * Math.random() * 2000 + 1000,
      // );
    }
  }

  public processHit(hitBy: Owner): void {
    if (!this.isIndestructible) {
      this.isDestroyed = { type: this.tankType, destroyedBy: hitBy };
      this.game.addDestroyedEnemyTankValue(
        hitBy,
        this.tankType as EnemyTankTypes,
      );
      this.handleDestruction();
    }
  }

  setIsTimeBlocked(isBlockedByTime: boolean) {
    this.timeBlockade = isBlockedByTime;

    if (isBlockedByTime === false) {
      this.fire();
    }

    // if (isBlockedByTime && this.reloadTimeout) {
    //   clearTimeout(this.reloadTimeout);
    // }
  }

  private handleDestruction() {
    // if (this.reloadTimeout) {
    //   clearTimeout(this.reloadTimeout);
    //   this.reloadTimeout = null;
    // }
    if (this.isSpecial) {
      this.game.generateFinding();
    }
    this.handleExplosion();
    if (this.isDestroyed?.destroyedBy) {
      this.game.values.push(
        new Value(this.getValue(), this.xPos, this.yPos + 12),
      );
      this.game.destroyedEnemyTanksList.push(this.isDestroyed);
    }
    const index = this.game.enemyTanks.indexOf(this);
    this.game.enemyTanks.splice(index, 1);
  }

  getValue() {
    switch (this.tankType) {
      case "Small": {
        return ENEMY_TANKS_SETTINGS.Small.value;
      }
      case "Fast": {
        return ENEMY_TANKS_SETTINGS.Fast.value;
      }
      default: {
        return 0;
      }
    }
  }

  setTankSpeed() {
    switch (this.tankType) {
      case "Fast": {
        this.speed = ENEMY_TANKS_SETTINGS.Fast.speed;
        break;
      }
      default: {
        this.speed = ENEMY_TANKS_SETTINGS.Small.speed;
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
