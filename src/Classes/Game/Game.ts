import { brickWallRecipe } from '../../Textures/BrickWall/BrickWallTexture';
import { player1smallTankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { LevelRecipe, StaticDrawable } from '../../Types/Types';
import { BrickWall } from '../BrickWall/BrickWall';
import { Bullet } from '../Bullet/Bullet';
import { ConcreteWall } from '../ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../ConcreteWallTextures/ConcreteWallTextures';
import { Curtin } from '../Curtin/Curtin';
import { Eagle } from '../Eagle/Eagle';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { GameInfoCanvas } from '../GameInfoCanvas/GameInfoCanvas';
import { GameOverAnimation } from '../GameOverAnimation/GameOverAnimation';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';
import { Tank } from '../Tank/Tank';

export class Game {
  gameStatus = 'Paused';
  bullets: Bullet[] = [];
  staticObjects: StaticDrawable[] = [];
  player1Tanks: Tank | null = null;
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  gameOverAnimation = new GameOverAnimation(150, 320);
  currentLevelNumber: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);
  levelsRecipe: LevelRecipe[];
  explosions: ExplosionAnimationFrames[] = [];
  //!! Get height and width from the constructor

  constructor(players: 1 | 2, levels: LevelRecipe[]) {
    this.levelsRecipe = levels;
    this.startGame();
  }

  startGame() {
    this.createStaticObjects();
    this.gameInfo.update(20, 3, 3, 1, 1);
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this.staticObjects);

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.player1Tanks = new Tank(116, 292, 20, 20, player1smallTankTextures, this.staticObjects, this.bullets, this.explosions);
    }, 1000);
    this.gameStatus = 'Started';
  }

  renderBullets(renderCtx: CanvasRenderingContext2D) {
    renderCtx &&
      this.bullets.forEach((bullet) => {
        bullet.draw(renderCtx);
      });
  }
  renderExplosions(renderCtx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.explosions.length; i++) {
      renderCtx && this.explosions[i].animateFrames(renderCtx);
      if (this.explosions[i].animationEnded) {
        this.explosions.splice(i, 1);
        i--;
      }
    }
  }

  createStaticObjects() {
    const { eagle } = this.levelsRecipe[this.currentLevelNumber];
    this.staticObjects.push(new Eagle(eagle.xPos, eagle.yPos, eagle.size, this.explosions));
    for (let i = 0; i < this.levelsRecipe[this.currentLevelNumber].staticObjectsRecipe.length; i++) {
      const { material, xPos, yPos, layoutType } = this.levelsRecipe[this.currentLevelNumber].staticObjectsRecipe[i];
      if (material === 'Brick') {
        this.staticObjects.push(new BrickWall(xPos, yPos, brickWallRecipe.elementSize, brickWallRecipe, layoutType, brickWallRecipe.textureSize));
      }
      if (material === 'Concrete') {
        this.staticObjects.push(
          new ConcreteWall(xPos, yPos, concreteWallRecipe.elementSize, concreteWallRecipe, layoutType, concreteWallRecipe.textureSize),
        );
      }
    }
  }
}

