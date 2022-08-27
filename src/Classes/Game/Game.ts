import { brickWallRecipe } from '../../Textures/BrickWall/BrickWallTexture';
import { enemyTankTextures } from '../../Textures/EnemyTankTextures/EnemyTankTextures';
import { player1TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { LevelRecipe, StaticDrawable } from '../../Types/Types';
import { BrickWall } from '../BrickWall/BrickWall';
import { Bullet } from '../Bullet/Bullet';
import { ConcreteWall } from '../ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../ConcreteWallTextures/ConcreteWallTextures';
import { Curtin } from '../Curtin/Curtin';
import { Eagle } from '../Eagle/Eagle';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { GameInfoCanvas } from '../GameInfoCanvas/GameInfoCanvas';
import { GameOverAnimation } from '../GameOverAnimation/GameOverAnimation';
import { PlayerTank } from '../PlayerTank/PlayerTank';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';

export class Game {
  gameStatus;
  bullets: Bullet[] = [];
  staticObjects: StaticDrawable[] = [];
  player1Tank: PlayerTank | null = null;
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  gameOverAnimation = new GameOverAnimation(150, 320);
  currentLevelNumber: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);
  levelsRecipe: LevelRecipe[];
  explosions: ExplosionAnimationFrames[] = [];
  enemyTanks: EnemyTank[] = [];
  //!! Get height and width from the constructor

  constructor(players: 1 | 2, levels: LevelRecipe[]) {
    this.levelsRecipe = levels;
    this.gameStatus = 'Ready';
    //this.startGame();
  }

  startGame() {
    this.createStaticObjects();
    this.gameInfo.update(20, 3, 3, 1, 1);
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this.staticObjects);

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.player1Tank = new PlayerTank(116, 292, 20, 20, player1TankTextures, this.staticObjects, this.bullets, this.explosions);
      //this.handleEnemyTankSpawn();
      this.addNewEnemyTank();
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

  renderEnemyTanks(renderCtx: CanvasRenderingContext2D) {
    this.enemyTanks.forEach((enemyTank) => {
      enemyTank.draw(renderCtx);
    });
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

  handleEnemyTankSpawn() {
    setInterval(() => {
      this.addNewEnemyTank();
    }, 5000);
  }

  addNewEnemyTank() {
    const enemyTanksList = [...this.levelsRecipe[this.currentLevelNumber].enemyTanksList];
    const index = Math.floor(Math.random() * enemyTanksList.length);
    const { x: xPos, y: yPos } = this.getSpawnCoordinates(Math.floor(Math.random() * 3));
    this.enemyTanks.push(
      new EnemyTank(xPos, yPos, 22, 22, enemyTankTextures, this.staticObjects, this.bullets, this.explosions, enemyTanksList[index]),
    );
  }

  private getSpawnCoordinates(index: number) {
    switch (index) {
      case 0: {
        return { x: 20, y: 4 };
      }
      case 1: {
        return { x: 164, y: 4 };
      }
      case 2: {
        return { x: 308, y: 4 };
      }
      default: {
        return { x: 20, y: 4 };
      }
    }
  }
}

