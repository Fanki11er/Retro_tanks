import { bulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { Owner, StaticDrawable, TankTypesTextures } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { Finding } from '../Finding/Finding';
import { PlayerBullet } from '../PlayerBullet/PlayerBullet';
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
    protected enemyTanks: EnemyTank[],
    protected findings: Finding[],
    protected owner: Owner,
  ) {
    super(xPos, yPos, width, height, textures, staticObjects, bullets);
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
      this.bullets.push(
        new PlayerBullet(
          x,
          y,
          2,
          2,
          this.controls.direction,
          bulletTextures,
          this.staticObjects,
          this.bullets,
          'Standard',
          this.enemyTanks,
          this.owner,
        ),
      );
      this.isLoading = true;
      this.isLoading &&
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
    }
  }
  handleCollisionsWithFindings() {
    for (let i = 0; i < this.findings.length; i++) {
      const collisionZone = this.findings[i].getCollisionZone();
      if (
        this.xPos <= collisionZone.B.x &&
        this.xPos + this.width >= collisionZone.A.x &&
        this.yPos <= collisionZone.C.y &&
        this.yPos + this.height >= collisionZone.A.y
      ) {
        this.findings[i].setIsTaken(this.owner);
      }
    }
  }

  public processHit(hitBy: Owner): void {}
}

