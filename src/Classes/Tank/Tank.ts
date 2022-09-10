import { Coordinates, DestroyedBy, Owner, /*StaticDrawable,*/ TankTypes, TankTypesTextures } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { AnimationFrames } from '../AnimationFrame/AnimationFrame';
//import { Bullet } from '../Bullet/Bullet';
import { Controls } from '../Controls/Controls';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { Game } from '../Game/Game';

import indestructibleTextures from '../IndestructibleTextures/IndestructibleTextures';

import spawnPointTextures from '../SpawnPointTextures/SpawnPointTextures';
import { TankMoveAnimation } from '../TankMoveAnimation/TankMoveAnimation';

export abstract class Tank {
  controls;
  protected speed = 0.35; //!! Send speed to function that check for collisions
  protected reloadSpeed = 0.5;
  protected moveAnimationSpeed = 15;
  protected image;
  protected isBlockedBy;
  protected isLoading;
  protected isSpawning;
  protected isIndestructible = true;
  protected spawnAnimationFrames;
  protected indestructibleAnimationFrames;
  protected moveAnimation;
  protected tankType: TankTypes = 'Small';
  protected isDestroyed: DestroyedBy | null = null;

  constructor(
    public xPos: number,
    public yPos: number,
    protected width: number,
    protected height: number,
    textures: TankTypesTextures,
    protected game: Game, //protected staticObjects: StaticDrawable[], //protected bullets: Bullet[],
  ) {
    this.controls = new Controls();
    this.image = textures.Small.forwardDirectionTextures[0];
    this.isBlockedBy = false;
    this.isLoading = false;
    this.isSpawning = true;
    this.spawnAnimationFrames = new AnimationFrames(spawnPointTextures.animationTexture, spawnPointTextures.textureSize);
    this.indestructibleAnimationFrames = new AnimationFrames(indestructibleTextures.animationTexture, indestructibleTextures.textureSize);
    this.moveAnimation = new TankMoveAnimation(textures[this.tankType]);
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.isSpawning) {
      this.spawnAnimationFrames.animateFrames(20, context, this.xPos, this.yPos, this.isSpawning, 0);
    } else if (!this.isSpawning && this.isIndestructible) {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 20, 20);
      this.indestructibleAnimationFrames.animateFrames(15, context, this.xPos - 2, this.yPos - 2, this.isIndestructible, 0);
    } else {
      this.update();
      context.drawImage(this.image, this.xPos, this.yPos, 20, 20);
    }
  }

  protected abstract selectImage(animationSpeed: number): HTMLImageElement;

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }

  abstract fire(): void;

  protected setPositionOfBullet(bulletWidth: number) {
    if (this.controls.direction === 'Forwards') {
      return new Coordinates(this.xPos + this.width / 2 - 1, this.yPos);
    }
    if (this.controls.direction === 'Backwards') {
      return new Coordinates(this.xPos + this.width / 2 - 1, this.yPos + this.height - bulletWidth);
    }
    if (this.controls.direction === 'Left') {
      return new Coordinates(this.xPos, this.yPos + this.height / 2 - 1);
    }
    if (this.controls.direction === 'Right') {
      return new Coordinates(this.xPos + this.width - bulletWidth, this.yPos + this.height / 2 - 1);
    }
    return new Coordinates(-20, -20);
  }

  getCollisionZone() {
    return new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height);
  }

  getIsDestroyed() {
    return this.isDestroyed;
  }

  getCoordinates() {
    return new Coordinates(this.xPos, this.yPos);
  }

  protected handleCollisionsWithBorders() {
    this.isBlockedBy = false;
    this.isBlockedBy = Utils.checkForCollisionWithBorders(this.controls.direction, this.xPos, this.yPos, this.width, this.height, 372, 320);
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
              new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
              this.controls.direction,
            );
          }
        }
      }
    }
  }

  protected handleImageChange() {
    const image = this.selectImage(this.moveAnimationSpeed);
    if (this.controls.direction === 'Forwards') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Backwards') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos += this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Left') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Right') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos += this.speed;
      }
      return;
    }
  }

  public abstract update(): void;
  public abstract processHit(hitBy: Owner): void;
  protected abstract spawn(time: number): void;
}

/*
public update() {
  this.isBlockedBy = false;
  this.isBlockedBy = Utils.checkForCollisionWithBorders(this.controls.direction, this.xPos, this.yPos, this.width, this.height, 372, 320);
  
  if (!this.isBlockedBy) {
      const collisionWith = Utils.checkForCollisionWithObjects(
        this.controls.direction,
        this.xPos,
        this.yPos,
        this.width,
        this.height,
        this.staticObjects,
      );
      if (collisionWith.length) {
        for (let i = 0; i < collisionWith.length; i++) {
          if (!this.isBlockedBy) {
            this.isBlockedBy = !!collisionWith[i].getPrecisionCollisionPlace(
              new ElementCollisionZone({ x: this.xPos, y: this.yPos }, this.width, this.height),
              this.controls.direction,
            );
          }
        }
      }
    }
    const image = this.selectImage(this.moveAnimationSpeed);
    if (this.controls.direction === 'Forwards') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Backwards') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.yPos += this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Left') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos -= this.speed;
      }
      return;
    }
    if (this.controls.direction === 'Right') {
      this.setImage(image);
      if (!this.isBlockedBy && this.controls.move) {
        this.xPos += this.speed;
      }
      return;
    }
  }
*/

