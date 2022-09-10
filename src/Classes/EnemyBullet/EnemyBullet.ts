import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { AmmunitionType, Direction, Owner } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { BulletHitZone } from '../BulletHitZone/BulletHitZone';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { Game } from '../Game/Game';
import { Tank } from '../Tank/Tank';

export class EnemyBullet extends Bullet {
  constructor(
    protected xPos: number,
    protected yPos: number,
    protected width: number,
    protected height: number,
    protected direction: Direction,
    protected textures: BulletTextures,
    protected ammunitionType: AmmunitionType = 'Standard',
    //!!PlayerBullets
    protected owner: Owner = '',
    protected game: Game,
  ) {
    super(xPos, yPos, width, height, direction, textures, ammunitionType, game);
  }

  public draw(context: CanvasRenderingContext2D) {
    this.checkForCollisionsWithStaticObjects();

    this.handleTanksHits();
    this.handleStaticObjectHit();
    this.handleExplosion();
    this.handleDrawImage(context);
  }

  private checkForTanksHit(bulletHitZone: BulletHitZone, tanks: Tank[]) {
    for (let i = 0; i < tanks.length; i++) {
      const enemyTankCollisionZone = tanks[i].getCollisionZone();
      if (
        bulletHitZone.A.x < enemyTankCollisionZone.B.x &&
        bulletHitZone.B.x > enemyTankCollisionZone.A.x &&
        bulletHitZone.A.y < enemyTankCollisionZone.C.y &&
        bulletHitZone.C.y > enemyTankCollisionZone.A.y
      ) {
        this.hit = true;
        tanks[i].processHit('');
      }
    }
  }

  private handleTanksHits() {
    this.checkForTanksHit(
      new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
      this.game.players.getActivePlayersTanks(),
    );
  }
}
