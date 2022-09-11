import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { AmmunitionType, Direction, Owner } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { Game } from '../Game/Game';

export class EnemyBullet extends Bullet {
  constructor(
    protected xPos: number,
    protected yPos: number,
    protected width: number,
    protected height: number,
    protected direction: Direction,
    protected textures: BulletTextures,
    protected ammunitionType: AmmunitionType = 'Standard',
    protected owner: Owner = '',
    protected game: Game,
  ) {
    super(xPos, yPos, width, height, direction, textures, ammunitionType, owner, game);
  }

  public draw(context: CanvasRenderingContext2D) {
    this.checkForCollisionsWithStaticObjects();

    this.handleTanksHits();
    this.handleStaticObjectHit();
    this.handleExplosion();
    this.handleDrawImage(context);
  }

  private handleTanksHits() {
    this.checkForTanksHit(
      new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
      this.game.players.getActivePlayersTanks(),
    );
  }
}

