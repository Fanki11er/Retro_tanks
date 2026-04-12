import { BulletTextures } from "../../Textures/BulletTextures/BulletTextures";
import type {
  AmmunitionType,
  Direction,
  Owner,
  TankTypes,
} from "../../Types/Types";
import { Bullet } from "../Bullet/Bullet";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";
import { Game } from "../Game/Game";

export class PlayerBullet extends Bullet {
  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    direction: Direction,
    textures: BulletTextures,
    ammunitionType: AmmunitionType = "Standard",
    owner: Owner,
    game: Game,
    tankType: TankTypes,
  ) {
    super(
      xPos,
      yPos,
      width,
      height,
      direction,
      textures,
      owner,
      game,
      "PlayerBullet",
      tankType,
    );
    this.ammunitionType = ammunitionType;
  }

  public draw(context: CanvasRenderingContext2D, deltaTime: number) {
    this.checkForCollisionsWithStaticObjects(deltaTime);

    this.handleEnemyTanksHits();
    this.handleStaticObjectHit();

    this.handleExplosion();
    this.handleDrawImage(context);
  }

  private handleEnemyTanksHits() {
    this.checkForTanksHit(
      new ElementCollisionZone(
        { x: this.xPos, y: this.yPos },
        this.width,
        this.height,
      ),
      this.game.enemyTanks,
    );
  }
}
