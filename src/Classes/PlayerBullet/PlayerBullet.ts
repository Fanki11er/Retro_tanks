import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { AmmunitionType, Direction, Owner } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { BulletHitZone } from '../BulletHitZone/BulletHitZone';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { Game } from '../Game/Game';

export class PlayerBullet extends Bullet {
  constructor(
    protected xPos: number,
    protected yPos: number,
    protected width: number,
    protected height: number,
    protected direction: Direction,
    protected textures: BulletTextures,
    protected ammunitionType: AmmunitionType = 'Standard',
    private enemyTanks: EnemyTank[], //!!Enemy bullets
    protected owner: Owner,
    protected game: Game,
  ) {
    super(xPos, yPos, width, height, direction, textures, ammunitionType, game);
  }

  public draw(context: CanvasRenderingContext2D) {
    this.checkForCollisionsWithStaticObjects();

    this.handleEnemyTanksHits();
    this.handleStaticObjectHit();

    this.handleExplosion();
    this.handleDrawImage(context);
  }

  private checkForEnemyTanksHit(bulletHitZone: BulletHitZone, enemyTanks: EnemyTank[]) {
    for (let i = 0; i < enemyTanks.length; i++) {
      const enemyTankCollisionZone = enemyTanks[i].getCollisionZone();
      if (
        bulletHitZone.A.x < enemyTankCollisionZone.B.x &&
        bulletHitZone.B.x > enemyTankCollisionZone.A.x &&
        bulletHitZone.A.y < enemyTankCollisionZone.C.y &&
        bulletHitZone.C.y > enemyTankCollisionZone.A.y
      ) {
        this.hit = true;
        enemyTanks[i].processHit(this.owner);
      }
    }
  }

  private handleEnemyTanksHits() {
    this.checkForEnemyTanksHit(new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height), this.enemyTanks);
  }
}

