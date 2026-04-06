import { Coordinates } from "../../Types/Types";
import type {
  DestroyedBy,
  Owner,
  Size,
  TankTypes,
  TankTypesTextures,
} from "../../Types/Types";
import { Utils } from "../../Utils/Utils";
import { AnimationFrames } from "../AnimationFrame/AnimationFrame";
import { Controls } from "../Controls/Controls";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";
import { Game } from "../Game/Game";
import indestructibleTextures from "../IndestructibleTextures/IndestructibleTextures";
import spawnPointTextures from "../SpawnPointTextures/SpawnPointTextures";
import { TankMoveAnimation } from "../TankMoveAnimation/TankMoveAnimation";
import { v4 as uuidv4 } from "uuid";
import { ExplosionAnimationFrames } from "../ExplosionAnimationFrames/ExplosionAnimationFrames";
import { largeExplosionTextures } from "../../Textures/ExplosionTextures/ExplosionTextures";
import { Timer } from "../Timer/Timer";
//import { TankSensor } from '../TankSensor/TankSensor';

export abstract class Tank {
  protected id;
  controls;
  protected speed = 0.4;
  protected reloadTime = 100;
  protected moveAnimationSpeed = 15;
  protected image;
  protected isBlockedBy;
  protected isLoading;
  protected isSpawning;
  protected isIndestructible = true;
  protected spawnAnimationFrames;
  protected indestructibleAnimationFrames;
  protected moveAnimation;
  protected tankType: TankTypes;
  protected isDestroyed: DestroyedBy | null = null;
  public xPos: number;
  public yPos: number;
  protected width: number;
  protected height: number;
  protected textures: TankTypesTextures;
  protected game: Game;
  protected isIndestructibleTimeOut = new Timer();
  protected spawnTimer = new Timer();
  protected loadingTimer = new Timer();
  //protected tankSensor: TankSensor;

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    textures: TankTypesTextures,
    tankType: TankTypes,
    game: Game,
  ) {
    this.id = uuidv4();
    this.controls = new Controls();
    this.image = textures.Small.forwardDirectionTextures[0];
    this.isBlockedBy = false;
    this.isLoading = false;
    this.isSpawning = true;
    this.tankType = tankType;
    this.spawnAnimationFrames = new AnimationFrames(
      spawnPointTextures.animationTexture,
      spawnPointTextures.textureSize,
    );
    this.indestructibleAnimationFrames = new AnimationFrames(
      indestructibleTextures.animationTexture,
      indestructibleTextures.textureSize,
    );
    this.moveAnimation = new TankMoveAnimation(textures[this.tankType]);
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.textures = textures;
    this.tankType = tankType;
    this.game = game;
    //this.tankSensor = new TankSensor(this, this.game);
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.isSpawning) {
      this.spawnAnimationFrames.animateFrames(
        20,
        context,
        this.xPos,
        this.yPos,
        this.isSpawning,
        /*0*/
      );
      this.spawnTimer.update();
    } else if (!this.isSpawning && this.isIndestructible) {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 20, 20);
      this.indestructibleAnimationFrames.animateFrames(
        15,
        context,
        this.xPos - 2,
        this.yPos - 2,
        this.isIndestructible,
        /*0*/
      );
      //this.tankSensor.draw(context);
    } else {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 20, 20);
      //this.tankSensor.draw(context);
    }
  }

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }

  protected setPositionOfBullet(bulletWidth: number) {
    if (this.controls.direction === "Forwards") {
      return new Coordinates(this.xPos + this.width / 2 - 1, this.yPos);
    }
    if (this.controls.direction === "Backwards") {
      return new Coordinates(
        this.xPos + this.width / 2 - 1,
        this.yPos + this.height - bulletWidth,
      );
    }
    if (this.controls.direction === "Left") {
      return new Coordinates(this.xPos, this.yPos + this.height / 2 - 2);
    }
    if (this.controls.direction === "Right") {
      return new Coordinates(
        this.xPos + this.width - bulletWidth,
        this.yPos + this.height / 2 - 2,
      );
    }
    return new Coordinates(-20, -20);
  }

  protected handleCollisionsWithBorders() {
    this.isBlockedBy = false;
    this.isBlockedBy = Utils.checkForCollisionWithBorders(
      this.controls.direction,
      this.xPos,
      this.yPos,
      this.width,
      this.height,
      372,
      320,
    );
  }

  protected handleCollisionsWithStaticObjects() {
    if (!this.isBlockedBy) {
      const collisionWith = Utils.checkForCollisionWithObjects(
        this.controls.direction,
        this.xPos,
        this.yPos,
        this.width,
        this.height,
        this.game.staticObjects,
      );
      if (collisionWith.length) {
        for (let i = 0; i < collisionWith.length; i++) {
          if (!this.isBlockedBy) {
            this.isBlockedBy = !!collisionWith[i].getPrecisionCollisionPlace(
              new ElementCollisionZone(
                { x: this.xPos, y: this.yPos },
                this.width,
                this.height,
              ),
              this.controls.direction,
            );
          }
        }
      }
    }
  }

  protected handleCollisionsWithOtherTanks(tanks: Tank[]) {
    if (!this.isBlockedBy && this.detectCollisionsWithOtherTanks(tanks)) {
      this.isBlockedBy = true;
    }
  }

  protected handleImageChange() {
    const image = this.selectImage(this.moveAnimationSpeed);
    if (this.controls.direction === "Forwards") {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos -= this.speed;
      } else this.yPos += 0;
      return;
    }
    if (this.controls.direction === "Backwards") {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos += this.speed;
      } else this.yPos += 0;
      return;
    }
    if (this.controls.direction === "Left") {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos -= this.speed;
      } else this.xPos -= 0;
      return;
    }
    if (this.controls.direction === "Right") {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos += this.speed;
      } else this.xPos += 0;
      return;
    }
  }

  protected detectCollisionsWithOtherTanks(tanks: Tank[]) {
    for (let i = 0; i < tanks.length; i++) {
      if (tanks[i].id === this.id) {
        continue;
      }
      const collisionZone = new ElementCollisionZone(
        { x: tanks[i].xPos, y: tanks[i].yPos },
        tanks[i].width,
        tanks[i].height,
      );
      if (this.controls.direction === "Forwards") {
        if (
          this.xPos + 0.5 < collisionZone.B.x &&
          this.xPos + this.width - 0.5 > collisionZone.A.x &&
          this.yPos >= collisionZone.A.y &&
          this.yPos <= collisionZone.D.y
        ) {
          return true;
        }
      }
      if (this.controls.direction === "Backwards") {
        if (
          this.xPos + 0.5 < collisionZone.B.x &&
          this.xPos + this.width - 0.5 > collisionZone.A.x &&
          this.yPos + this.height >= collisionZone.A.y &&
          this.yPos + this.height <= collisionZone.D.y
        ) {
          return true;
        }
      }

      if (this.controls.direction === "Left") {
        if (
          this.yPos + 0.5 < collisionZone.D.y &&
          this.yPos + this.height - 0.5 > collisionZone.A.y &&
          this.xPos <= collisionZone.D.x &&
          this.xPos >= collisionZone.A.x
        ) {
          return true;
        }
      }
      if (this.controls.direction === "Right") {
        if (
          this.yPos + 0.5 < collisionZone.D.y &&
          this.yPos + this.height - 0.5 > collisionZone.A.y &&
          this.xPos + this.width >= collisionZone.A.x &&
          this.xPos + this.width <= collisionZone.B.x
        ) {
          return true;
        }
      }
    }
    return false;
  }

  protected handleExplosion() {
    this.game.explosions.push(
      new ExplosionAnimationFrames(
        largeExplosionTextures.animationTexture,
        30,
        20,
        this.xPos - 4,
        this.yPos - 4,
      ),
    );
  }

  getCollisionZone() {
    return new ElementCollisionZone(
      { x: this.xPos, y: this.yPos },
      this.width,
      this.height,
    );
  }

  getIsDestroyed() {
    return this.isDestroyed;
  }

  getCoordinates() {
    return new Coordinates(this.xPos, this.yPos);
  }
  getIsSpawning() {
    return this.isSpawning;
  }

  getSize() {
    return {
      width: this.width,
      height: this.height,
    } as Size;
  }

  setIsBlockedBy(isBlockedBy: boolean) {
    this.isBlockedBy = isBlockedBy;
  }

  getIsIndestructible() {
    return this.isIndestructible;
  }

  getId() {
    return this.id;
  }

  public abstract fire(): void;
  public abstract update(): void;
  public abstract processHit(hitBy: Owner): void;
  protected abstract spawn(time: number): void;
  protected abstract selectImage(animationSpeed: number): HTMLImageElement;
}
