import { brickWallRecipe } from '../../Textures/BrickWall/BrickWallTexture';
import { StaticDrawable } from '../../Types/Types';
import { Utils } from '../../Utils/Utils';
import { BrickWall } from '../BrickWall/BrickWall';
import { ConcreteWall } from '../ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../ConcreteWallTextures/ConcreteWallTextures';
import { Eagle } from '../Eagle/Eagle';
import { Game } from '../Game/Game';
import { Wall } from '../Wall/Wall';

export class StaticElementsCanvas {
  canvas;
  canvasCtx;
  staticObjects: StaticDrawable[];
  isEagleDestroyed = false;

  constructor(public width: number, public height: number, private game: Game) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx = this.canvas.getContext('2d');
    this.staticObjects = this.game.staticObjects;
  }

  createStaticObjects() {
    const { eagle } = this.game.levelsRecipe[this.game.currentLevelNumber];
    this.staticObjects.push(new Eagle(eagle.xPos, eagle.yPos, eagle.size, this.game.explosions));
    for (let i = 0; i < this.game.levelsRecipe[this.game.currentLevelNumber].staticObjectsRecipe.length; i++) {
      const { material, xPos, yPos, layoutType, eagleBorder } = this.game.levelsRecipe[this.game.currentLevelNumber].staticObjectsRecipe[i];
      if (material === 'Brick') {
        this.staticObjects.push(
          new BrickWall(xPos, yPos, brickWallRecipe.elementSize, brickWallRecipe, layoutType, brickWallRecipe.textureSize, eagleBorder),
        );
      }
      if (material === 'Concrete') {
        this.staticObjects.push(
          new ConcreteWall(xPos, yPos, concreteWallRecipe.elementSize, concreteWallRecipe, layoutType, concreteWallRecipe.textureSize, eagleBorder),
        );
      }
    }
    this.update();
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.checkForChanges();
    ctx.drawImage(this.canvas, 0, 0);
  }

  update() {
    this.canvasCtx?.clearRect(20, 4, 312, 312);
    if (this.canvasCtx) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        if (this.staticObjects[i].isDestroyed && this.staticObjects[i].id !== 'Eagle' && !this.staticObjects[i].getIsEagleBorder()) {
          Utils.removeDestroyedElement(this.staticObjects, this.staticObjects[i].id);
        } else if (this.staticObjects[i].isDestroyed && this.staticObjects[i].id === 'Eagle') {
          this.isEagleDestroyed = true;
        }
        this.staticObjects[i] && this.staticObjects[i].draw(this.canvasCtx);
      }
    }
  }

  checkForChanges() {
    for (let i = 0; i < this.staticObjects.length; i++) {
      if (this.staticObjects[i].changed) {
        this.update();
        this.staticObjects[i].changed = false;
        return;
      }
    }
  }

  handleEagleBordersArmourChange(time: number) {
    this.armEagleBorders();
    setTimeout(() => {
      this.unarmEagleBorders();
    }, time * 1000);
  }

  private armEagleBorders() {
    this.staticObjects.forEach((object, index) => {
      if (object.getIsEagleBorder()) {
        const wall = object as Wall;
        const { x: xPos, y: yPos } = wall.getCoordinates();
        const type = wall.getType();
        this.staticObjects.splice(
          index,
          1,
          new ConcreteWall(xPos, yPos, concreteWallRecipe.elementSize, concreteWallRecipe, type, concreteWallRecipe.textureSize, true),
        );
      }
    });
    this.update();
  }

  private unarmEagleBorders() {
    this.staticObjects.forEach((object, index) => {
      if (object.getIsEagleBorder()) {
        const wall = object as Wall;
        const { x: xPos, y: yPos } = wall.getCoordinates();
        const type = wall.getType();
        this.staticObjects.splice(
          index,
          1,
          new BrickWall(xPos, yPos, brickWallRecipe.elementSize, brickWallRecipe, type, brickWallRecipe.textureSize, true),
        );
      }
    });
    this.update();
  }
}

