import { brickWallRecipe } from "../../Textures/BrickWall/BrickWallTexture";
import type { StaticDrawable } from "../../Types/Types";
import { Utils } from "../../Utils/Utils";
import { BrickWall } from "../BrickWall/BrickWall";
import { ConcreteWall } from "../ConcreteWall/ConcreteWall";
import { concreteWallRecipe } from "../ConcreteWallTextures/ConcreteWallTextures";
import { Eagle } from "../Eagle/Eagle";
import { Game } from "../Game/Game";
import { Timer } from "../Timer/Timer";
import { Wall } from "../Wall/Wall";

export class StaticElementsCanvas {
  canvas;
  canvasCtx;
  staticObjects: StaticDrawable[];
  isEagleDestroyed = false;
  private game: Game;
  private armEagleBordersTimer = new Timer();

  constructor(game: Game) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = game.canvasWidth;
    this.canvas.height = game.canvasHeight;
    this.game = game;
    this.canvasCtx = this.canvas.getContext("2d");
    this.staticObjects = game.staticObjects;
  }

  createStaticObjects() {
    const { eagle } = this.game.levelsRecipe[this.game.getCurrentLevelIndex()];
    const eagleObject = new Eagle(
      eagle.xPos,
      eagle.yPos,
      eagle.size,
      this.game.explosions,
    );
    this.staticObjects.push(eagleObject);
    eagleObject.changed = true;
    for (
      let i = 0;
      i <
      this.game.levelsRecipe[this.game.getCurrentLevelIndex()]
        .staticObjectsRecipe.length;
      i++
    ) {
      const { material, xPos, yPos, layoutType, eagleBorder } =
        this.game.levelsRecipe[this.game.getCurrentLevelIndex()]
          .staticObjectsRecipe[i];
      if (material === "Brick") {
        const newWall = new BrickWall(
          xPos,
          yPos,
          brickWallRecipe.elementSize,
          brickWallRecipe,
          layoutType,
          brickWallRecipe.textureSize,
          eagleBorder,
        );
        newWall.changed = true;
        this.staticObjects.push(newWall);
      }
      if (material === "Concrete") {
        const newWall = new ConcreteWall(
          xPos,
          yPos,
          concreteWallRecipe.elementSize,
          concreteWallRecipe,
          layoutType,
          concreteWallRecipe.textureSize,
          eagleBorder,
        );
        newWall.changed = true;
        this.staticObjects.push(newWall);
      }
    }
    //this.update();
  }

  resetStaticObjects() {
    this.staticObjects = [];
    this.createStaticObjects();
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.armEagleBordersTimer.update(deltaTime);
    this.checkForChanges();

    ctx.drawImage(this.canvas, 0, 0);
  }

  update() {
    this.canvasCtx?.clearRect(20, 4, 312, 312);
    if (this.canvasCtx) {
      for (let i = 0; i < this.staticObjects.length; i++) {
        if (
          this.staticObjects[i].isDestroyed &&
          this.staticObjects[i].id !== "Eagle" &&
          !this.staticObjects[i].getIsEagleBorder()
        ) {
          Utils.removeDestroyedElement(
            this.staticObjects,
            this.staticObjects[i].id,
          );
        } else if (
          this.staticObjects[i].isDestroyed &&
          this.staticObjects[i].id === "Eagle"
        ) {
          this.isEagleDestroyed = true;
        }
        //this.staticObjects[i] && this.staticObjects[i].draw(this.canvasCtx);
        if (this.staticObjects[i]) {
          this.staticObjects[i].draw(this.canvasCtx);
        }
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

    this.armEagleBordersTimer.start(() => {
      this.unarmEagleBorders();
    }, time);
  }

  private armEagleBorders() {
    this.staticObjects.forEach((object, index) => {
      if (object.getIsEagleBorder()) {
        const wall = object as Wall;
        const { x: xPos, y: yPos } = wall.getCoordinates();
        const type = wall.getType();
        const newWall = new ConcreteWall(
          xPos,
          yPos,
          concreteWallRecipe.elementSize,
          concreteWallRecipe,
          type,
          concreteWallRecipe.textureSize,
          true,
        );
        newWall.changed = true;

        this.staticObjects.splice(index, 1, newWall);
      }
    });
    //this.update();
  }

  private unarmEagleBorders() {
    this.staticObjects.forEach((object, index) => {
      if (object.getIsEagleBorder()) {
        const wall = object as Wall;
        const { x: xPos, y: yPos } = wall.getCoordinates();
        const type = wall.getType();
        const newWall = new BrickWall(
          xPos,
          yPos,
          brickWallRecipe.elementSize,
          brickWallRecipe,
          type,
          brickWallRecipe.textureSize,
          true,
        );
        newWall.changed = true;
        this.staticObjects.splice(index, 1, newWall);
      }
    });
    //this.update();
  }
}
