import { levels } from '../../Levels/Levels';
import { enemyTankTextures } from '../../Textures/EnemyTankTextures/EnemyTankTextures';
import { smallExplosionTextures } from '../../Textures/ExplosionTextures/ExplosionTextures';
import { findingsTextures } from '../../Textures/FindingsTextures/FindingsTextures';
import { player1TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { DestroyedBy, FindingsTypes, LevelRecipe, Owner, StaticDrawable, TankTypes } from '../../Types/Types';
import { Bullet } from '../Bullet/Bullet';
import { Curtin } from '../Curtin/Curtin';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { ExplosionAnimationFrames } from '../ExplosionAnimationFrames/ExplosionAnimationFrames';
import { Finding } from '../Finding/Finding';
import { GameInfoCanvas } from '../GameInfoCanvas/GameInfoCanvas';
import { GameOverAnimation } from '../GameOverAnimation/GameOverAnimation';
import { Players } from '../Players/Players';
import { PlayerTank } from '../PlayerTank/PlayerTank';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';
import { Value } from '../Value/Value';

export class Game {
  gameStatus;
  bullets: Bullet[] = [];
  staticObjects: StaticDrawable[] = [];
  players: Players;
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  gameOverAnimation = new GameOverAnimation(150, 320);
  currentLevelNumber: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);
  levelsRecipe: LevelRecipe[];
  explosions: ExplosionAnimationFrames[] = [];
  enemyTanks: EnemyTank[] = [];
  enemyTanksList: TankTypes[] = [];
  values: Value[] = [];
  destroyedEnemyTanksList: DestroyedBy[] = [];
  findings: Finding[] = [];
  findingsList: FindingsTypes[] = ['Tank', 'Grenade', 'Helmet', 'Stopwatch', 'Shovel', 'Star'];
  timeBlockade = false;
  //!!!!!!!! Try to make renderer object which will be render things instead canvas

  //!! Get height and width from the constructor
  //!! Check if all enemy tanks destroyed and finish the round

  constructor(players: 1 | 2, levels: LevelRecipe[]) {
    this.levelsRecipe = levels;
    this.players = new Players(players);
    this.gameStatus = 'Ready';
  }

  startGame() {
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this);
    this.staticObjectsCanvas.createStaticObjects();
    this.enemyTanksList = [...levels[this.currentLevelNumber].enemyTanksList];
    this.handleGameInfoUpdate();

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.handlePlayerTankSpawn('player1');
      // ! What if we have two players
      this.addNewEnemyTank();
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

  renderValues(renderCtx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.values.length; i++) {
      if (!this.values[i].animationEnded) {
        this.values[i].showValue(renderCtx);
      } else {
        this.values.splice(i, 1);
        i--;
      }
    }
  }

  renderFindings(renderCtx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.findings.length; i++) {
      if (this.findings[i].getIsTaken()) {
        const { x: xPos, y: yPos } = this.findings[i].getCoordinates();
        const value = this.findings[i].getValue();
        const isTakenBy = this.findings[i].getIsTaken();

        this.values.push(new Value(value, xPos, yPos + 12, 0.2, 2.5));
        this.handleAddPlayerScore(isTakenBy, value);
        this.handleProcessRewardFromFinding(isTakenBy, this.findings[i].getType());
        this.findings.splice(i, 1);
        i++;
      } else if (this.findings[i].getTimeIsOut()) {
        this.findings.splice(i, 1);
        i++;
      } else {
        this.findings[i].draw(renderCtx);
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
    const index = Math.floor(Math.random() * this.enemyTanksList.length);
    const { x: xPos, y: yPos } = this.getSpawnCoordinates(Math.floor(Math.random() * 3));
    this.enemyTanks.push(
      new EnemyTank(
        xPos,
        yPos,
        22,
        22,
        enemyTankTextures,
        this.enemyTanksList[index],
        this.ShouldBeSpecial(this.enemyTanksList),
        this.timeBlockade,
        this,
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
    this.gameInfo.update(this.enemyTanksList.length, this.players, this.currentLevelNumber + 1);
  }

  handlePlayerTankSpawn(owner: Owner) {
    if (owner && this.players[`${owner}`]) {
      if (this.players[`${owner}`]!.getPlayerLivesLeft() > 0 && !this.players[`${owner}`]!.playerTank)
        this.players[`${owner}`]!.playerTank = new PlayerTank(116, 292, 20, 20, player1TankTextures, 'Small', owner, this);
      this.players[`${owner}`]?.modifyPlayerLivesLeft(-1);
      this.handleGameInfoUpdate();
    }
  }

  private checkForOtherBulletsHit() {
    for (let i = 0; i < this.bullets.length - 1; i++) {
      const firstBulletCollisionZone = this.bullets[i].getCollisionZone();
      for (let j = i + 1; j < this.bullets.length; j++) {
        const secondBulletCollisionZone = this.bullets[j].getCollisionZone();

        if (
          firstBulletCollisionZone.A.x < secondBulletCollisionZone.B.x &&
          firstBulletCollisionZone.B.x > secondBulletCollisionZone.A.x &&
          firstBulletCollisionZone.A.y < secondBulletCollisionZone.C.y &&
          firstBulletCollisionZone.C.y > secondBulletCollisionZone.A.y
        ) {
          this.bullets[i].processHit();
          this.bullets[j].processHit();
        }
      }
    }
  }
  handleBulletsHit() {
    this.checkForOtherBulletsHit();
    this.removeDestroyedBullets();
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

  private handleAddPlayerScore(owner: Owner, value: number) {
    if (owner) {
      this.players[`${owner}`]?.addPlayerScore(value);
    }
  }

  //Handle findings

  generateFinding() {
    const index = Math.floor(Math.random() * this.findingsList.length);
    const xPos = Math.floor(Math.random() * 300 + 4);
    const yPos = Math.floor(Math.random() * 240 + 20);
    switch (this.findingsList[index]) {
      case 'Tank': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.tankFindingTexture, 24));
        break;
      }
      case 'Grenade': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.grenadeFindingTexture, 24));
        break;
      }
      case 'Helmet': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.helmetFindingTexture, 24));
        break;
      }
      case 'Stopwatch': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.stopwatchFindingTexture, 24));
        break;
      }
      case 'Shovel': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.shovelFindingTexture, 24));
        break;
      }
      case 'Star': {
        this.findings.push(new Finding(this.findingsList[index], xPos, yPos, findingsTextures.starFindingTexture, 24));
        break;
      }
    }
  }

  private handleProcessRewardFromFinding(owner: Owner, findingType: FindingsTypes) {
    switch (findingType) {
      case 'Tank': {
        this.handleAddPlayerLive(owner);
        break;
      }
      case 'Grenade': {
        this.handleDestroyAllEnemyTanks();
        break;
      }
      case 'Helmet': {
        this.handleMakePlayerIndestructible(owner);
        break;
      }
      case 'Stopwatch': {
        this.handleBlockAllEnemyTanks(6);
        break;
      }
      case 'Shovel': {
        this.handleArmorEagle(6);
        break;
      }
      case 'Star': {
        this.handlePlayerTankUpdate(owner);
        break;
      }
    }
  }

  private handleDestroyAllEnemyTanks() {
    this.enemyTanks.forEach((enemyTank) => {
      enemyTank.processHit('');
    });
  }

  private handleAddPlayerLive(owner: Owner) {
    if (owner) {
      this.players[`${owner}`]?.modifyPlayerLivesLeft(1);
      this.handleGameInfoUpdate();
    }
  }

  private handleMakePlayerIndestructible(owner: Owner) {
    if (owner) {
      this.players[`${owner}`]?.playerTank?.madeIndestructible(10);
    }
  }
  private handleBlockAllEnemyTanks(time: number) {
    this.timeBlockade = true;
    setTimeout(() => {
      this.timeBlockade = false;
    }, time * 1000);
    this.enemyTanks.forEach((enemyTank) => {
      enemyTank.setIsTimeBlocked(time);
    });
  }

  private handleArmorEagle(time: number) {
    this.staticObjectsCanvas?.handleEagleBordersArmourChange(time);
  }

  private handlePlayerTankUpdate(owner: Owner) {
    if (owner) {
      this.players[owner]?.playerTank?.updateTank();
    }
  }

  checkForGameOver() {
    if (this.staticObjectsCanvas?.isEagleDestroyed) {
      return true;
    }
    if (this.players.player1 && this.players.player1.isPlayerDestroyed() && !this.players.player2) {
      return true;
    }
    if (this.players.player1 && this.players.player1.isPlayerDestroyed() && this.players.player2 && this.players.player2.isPlayerDestroyed()) {
      return true;
    }
    return false;
  }
}

