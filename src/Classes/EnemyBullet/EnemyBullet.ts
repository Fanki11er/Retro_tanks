import { Bullet } from "../Bullet/Bullet";
import { Game } from "../Game/Game";
import { BulletTextures } from "../../Textures/BulletTextures/BulletTextures";
import type { AmmunitionType, Direction, Owner } from "../../Types/Types";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";

export class EnemyBullet extends Bullet {
  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    direction: Direction,
    textures: BulletTextures,
    ammunitionType: AmmunitionType = "Standard",
    owner: Owner = "",
    game: Game
  ) {
    super(xPos, yPos, width, height, direction, textures, owner, game);
    this.ammunitionType = ammunitionType;
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
      new ElementCollisionZone(
        { x: this.xPos, y: this.yPos },
        this.width,
        this.height
      ),
      this.game.players.getActivePlayersTanks()
    );
  }
}
