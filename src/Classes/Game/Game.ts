import { levels } from '../../Levels/Levels';
import { brickWallRecipe } from '../../Textures/BrickWall/BrickWallTexture';
import { enemyTankTextures } from '../../Textures/EnemyTankTextures/EnemyTankTextures';
import { largeExplosionTextures, smallExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { player1TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { LevelRecipe, StaticDrawable, TankTypes } from '../../Types/Types';
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
  player1LivesLeft = 3;
  player1Score = 0;
  player2LivesLeft = 3;
  player2Score = 0;
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  gameOverAnimation = new GameOverAnimation(150, 320);
  currentLevelNumber: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);
  levelsRecipe: LevelRecipe[];
  explosions: ExplosionAnimationFrames[] = [];
  enemyTanks: EnemyTank[] = [];
  enemyTanksList: TankTypes[] = [];
  destroyedEnemyTanksList: TankTypes[] = [];
  //!! Get height and width from the constructor

  constructor(private players: 1 | 2, levels: LevelRecipe[]) {
    this.levelsRecipe = levels;
    this.gameStatus = 'Ready';
    //this.startGame();
  }

  startGame() {
    this.createStaticObjects();
    this.enemyTanksList = [...levels[this.currentLevelNumber].enemyTanksList];
    //this.gameInfo.update(this.enemyTanksList.length, this.player1LivesLeft, this.player2LivesLeft, this.players, this.currentLevelNumber);
    this.handleGameInfoUpdate();
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this.staticObjects);

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.handlePlayer1TankSpawn();
      //this.player1Tank = new PlayerTank(116, 292, 20, 20, player1TankTextures, this.staticObjects, this.bullets, this.explosions);
      this.addNewEnemyTank();
      //this.handleGameInfoUpdate()
      // this.gameInfo.update(this.enemyTanksList.length, 3, 3, 1, 1);
      this.handleEnemyTankSpawn();
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

  private handleEnemyTankSpawn() {
    setInterval(() => {
      if (this.enemyTanksList.length && this.enemyTanks.length < 4) {
        this.addNewEnemyTank();
      }
    }, 5000);
  }

  private addNewEnemyTank() {
    //const enemyTanksList = [...this.levelsRecipe[this.currentLevelNumber].enemyTanksList];
    const index = Math.floor(Math.random() * this.enemyTanksList.length);
    const { x: xPos, y: yPos } = this.getSpawnCoordinates(Math.floor(Math.random() * 3));
    this.enemyTanks.push(
      new EnemyTank(
        xPos,
        yPos,
        22,
        22,
        enemyTankTextures,
        this.staticObjects,
        this.bullets,
        this.explosions,
        this.enemyTanksList[index],
        this.ShouldBeSpecial(this.enemyTanksList),
      ),
    );
    this.enemyTanksList.splice(index, 1);
    this.handleGameInfoUpdate();
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

  private ShouldBeSpecial(tanksList: TankTypes[]) {
    const length = tanksList.length;
    if (length === 16 || length === 9 || length === 2) {
      return true;
    }
    return false;
  }

  private handleGameInfoUpdate() {
    this.gameInfo.update(this.enemyTanksList.length, this.player1LivesLeft, this.player2LivesLeft, this.players, this.currentLevelNumber + 1);
  }

  private handlePlayer1TankSpawn() {
    if (!this.player1Tank && this.player1LivesLeft > 0) {
      this.player1Tank = new PlayerTank(116, 292, 20, 20, player1TankTextures, this.staticObjects, this.bullets, this.enemyTanks);
      this.player1LivesLeft -= 1;
      this.handleGameInfoUpdate();
    }
  }

  removeDestroyedTanks() {
    for (let i = 0; i < this.enemyTanks.length; i++) {
      if (this.enemyTanks[i].getIsDestroyed()) {
        const { x: xPos, y: yPos } = this.enemyTanks[i].getCoordinates();
        if (this.enemyTanks[i].getIsSpecial()) {
          //! Add new finding
        }
        //!! Figure whose bullet destroyed tank when two players play
        //!! Add floating message with score
        this.explosions.push(new ExplosionAnimationFrames(largeExplosionTextures.animationTexture, 30, 20, xPos - 4, yPos - 4));
        //!! Add type to destroyed
        this.enemyTanks.splice(i, 1);
        i--;
      }
    }
  }

  removeDestroyedBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].getIsDestroyed()) {
        const { x: xPos, y: yPos } = this.bullets[i].getExplosionPosition();
        this.explosions.push(
          new ExplosionAnimationFrames(smallExplosionTextures.animationTexture, smallExplosionTextures.textureSize, 20, xPos, yPos),
        );
        this.bullets.splice(i, 1);
        i--;
      }
    }
  }
}

