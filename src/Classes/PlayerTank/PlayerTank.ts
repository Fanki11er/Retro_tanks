import {
  PLAYER_TANK_RESPAWN_TIME,
  PLAYER_TANKS_SETTINGS,
  SPAWN_ANIMATION_TIME,
} from "../../constants";
import { bulletTextures } from "../../Textures/BulletTextures/BulletTextures";
import type {
  Owner,
  PlayerTankTypes,
  TankTypesTextures,
} from "../../Types/Types";
import { Bullet } from "../Bullet/Bullet";
import { Game } from "../Game/Game";
import { Tank } from "../Tank/Tank";
export class PlayerTank extends Tank {
  private owner: Owner;
  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    textures: TankTypesTextures,
    tankType: PlayerTankTypes,
    owner: Owner,
    game: Game,
  ) {
    super(xPos, yPos, width, height, textures, tankType, game);
    //!!!!!!!!!!!!!!!!!!!!!!!!
    this.madeIndestructible(5);
    this.spawn(SPAWN_ANIMATION_TIME);
    this.owner = owner;
  }

  update(deltaTime: number) {
    this.isIndestructibleTimeOut.update(deltaTime);
    this.loadingTimer.update(deltaTime);
    this.handleCollisionsWithBorders();
    this.handleCollisionsWithFindings();
    this.handleCollisionsWithOtherTanks(this.game.enemyTanks);
    this.handleCollisionsWithOtherTanks(
      this.game.players.getActivePlayersTanks(),
    );
    this.handleCollisionsWithStaticObjects();
    this.handleImageChange(deltaTime);
    //this.tankSensor.update();
  }

  madeIndestructible(time: number) {
    this.isIndestructible = true;
    this.isIndestructibleTimeOut.start(() => {
      this.isIndestructible = false;
    }, time);
    // setTimeout(() => {

    // setTimeout(() => {
    //   this.isIndestructible = false;
    // }, time * 1000);
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    this.spawnTimer.start(() => {
      this.isSpawning = false;
    }, time);

    // setTimeout(() => {
    //   this.isSpawning = false;
    // }, time * 1000);
  }

  protected selectImage(deltaTime: number, animationSpeed: number) {
    return this.moveAnimation.setImage(
      this.controls.direction,
      this.controls.move,
      deltaTime,
      animationSpeed,
    );
  }

  fire() {
    if (!this.isLoading && !this.isSpawning) {
      const { x, y } = this.setPositionOfBullet(4);
      this.game.bullets.push(
        new Bullet(
          x,
          y,
          2,
          2,
          this.controls.direction,
          bulletTextures,
          this.owner,
          this.game,
          "PlayerBullet",
          this.tankType,
        ),
      );
      this.isLoading = true;
      //this.isLoading &&
      this.loadingTimer.start(() => {
        this.isLoading = false;
      }, this.reloadTime);

      // setTimeout(() => {
      //   this.isLoading = false;
      // }, this.reloadTime * 1000);
    }
  }
  handleCollisionsWithFindings() {
    for (let i = 0; i < this.game.findings.length; i++) {
      const collisionZone = this.game.findings[i].getCollisionZone();
      if (
        this.xPos <= collisionZone.B.x &&
        this.xPos + this.width >= collisionZone.A.x &&
        this.yPos <= collisionZone.C.y &&
        this.yPos + this.height >= collisionZone.A.y
      ) {
        this.game.findings[i].setIsTaken(this.owner);
      }
    }
  }

  public processHit(/*hitBy: Owner*/): void {
    if (!this.isIndestructible) {
      this.handleExplosion();
      this.handleDestruction();
    }
  }

  updateTank() {
    if (this.updateTankType()) {
      this.moveAnimation.changeTextures(this.textures[this.tankType]);
    }
  }
  //!! Check if its ok
  updateTankType() {
    switch (this.tankType) {
      case 0: {
        this.tankType = 1;
        this.reloadTime = PLAYER_TANKS_SETTINGS[1].reloadTime;
        this.speed = PLAYER_TANKS_SETTINGS[1].speed;
        //! on last level change ammunition type

        return true;
      }
    }
    return false;
  }

  private handleDestruction() {
    if (this.owner) {
      this.game.players[this.owner]!.playerTank = null;
      this.game.handlePlayerTankSpawn(this.owner, PLAYER_TANK_RESPAWN_TIME);
    }
  }

  getOwner() {
    return this.owner;
  }
}
