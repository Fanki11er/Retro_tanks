import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { Owner, TankTypesTextures } from '../../Types/Types';

import { Game } from '../Game/Game';
import { PlayerBullet } from '../PlayerBullet/PlayerBullet';
import { Tank } from '../Tank/Tank';

export class PlayerTank extends Tank {
  constructor(
    public xPos: number,
    public yPos: number,
    protected width: number,
    protected height: number,
    public textures: TankTypesTextures,
    protected owner: Owner,
    protected game: Game,
  ) {
    super(xPos, yPos, width, height, textures, game);
    this.madeIndestructible(4);
    this.spawn(2.5);
  }

  update() {
    this.handleCollisionsWithBorders();
    this.handleCollisionsWithFindings();
    this.handleCollisionsWithStaticObjects();
    this.handleImageChange();
  }

  madeIndestructible(time: number) {
    this.isIndestructible = true;
    setTimeout(() => {
      this.isIndestructible = false;
    }, time * 1000);
  }

  protected spawn(time: number) {
    this.isSpawning = true;
    setTimeout(() => {
      this.isSpawning = false;
    }, time * 1000);
  }

  protected selectImage(animationSpeed: number) {
    return this.moveAnimation.setImage(this.controls.direction, this.controls.move, animationSpeed);
  }

  fire() {
    if (!this.isLoading && !this.isSpawning) {
      const { x, y } = this.setPositionOfBullet(4);
      this.game.bullets.push(
        new PlayerBullet(x, y, 2, 2, this.controls.direction, bulletTextures, 'Standard', this.game.enemyTanks, this.owner, this.game),
      );
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, this.reloadTime * 1000);
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

  public processHit(hitBy: Owner): void {}

  updateTank() {
    if (this.updateTankType()) {
      this.moveAnimation.changeTextures(this.textures[this.tankType]);
    }
  }

  updateTankType() {
    switch (this.tankType) {
      case 'Small': {
        this.tankType = 'Medium';
        this.reloadTime = 0.4;
        this.speed = 0.4;
        //! on last level change ammunition type

        return true;
      }
    }
    return false;
  }
}

