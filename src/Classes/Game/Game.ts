import { levels } from "../../Levels/Levels";
import { enemyTankTextures } from "../../Textures/EnemyTankTextures/EnemyTankTextures";
import { smallExplosionTextures } from "../../Textures/ExplosionTextures/ExplosionTextures";
import { findingsTextures } from "../../Textures/FindingsTextures/FindingsTextures";
import { player1TankTextures } from "../../Textures/TanksTextures/TanksTextures";
import {
  Coordinates,
  type DestroyedBy,
  type EnemyTankTypes,
  type FindingsTypes,
  type LevelRecipe,
  type Owner,
  type StaticDrawable,
  type TankTypes,
  type TankTypesTextures,
} from "../../Types/Types";
import { Curtin } from "../Curtin/Curtin";
import { EnemyTank } from "../EnemyTank/EnemyTank";
import { ExplosionAnimationFrames } from "../ExplosionAnimationFrames/ExplosionAnimationFrames";
import { Finding } from "../Finding/Finding";
import { GameInfoCanvas } from "../GameInfoCanvas/GameInfoCanvas";
import { GameOverTextAnimation } from "../GameOverTextAnimation/GameOverTextAnimation";
import { Players } from "../Players/Players";
import { PlayerTank } from "../PlayerTank/PlayerTank";
import { StaticElementsCanvas } from "../StaticElementsCanvas/StaticElementsCanvas";
import { Value } from "../Value/Value";
import { Bullet } from "../Bullet/Bullet";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";
import { PlayerResults } from "../PlayerResults/PlayerResults";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CORTIN_ANIMATION_DELAY,
  ENEMY_TANK_IMAGE_SIZE,
  ENEMY_TANKS_SETTINGS,
  ENEMY_TANKS_SPAWN_INTERVAL,
  EXPLOSION_ANIMATION_SPEED,
  FINDING_IMAGE_SIZE,
  GAME_STATUS,
  PLAYER_TANK_IMAGE_SIZE,
} from "../../constants";
import { GameOverScreen } from "../GameOverScreen/GameOverScreen";
import { MainMenu } from "../MainMenu/MainMenu";
import { Timer } from "../Timer/Timer";
import { Renderer } from "../../systems/renderer/Renderer";
export class Game {
  private renderCtx: CanvasRenderingContext2D | null = null;
  private renderer: Renderer | null = null;
  private currentLevelIndex: number = 0;
  private lastTime!: number;
  canvasWidth = CANVAS_WIDTH;
  canvasHeight = CANVAS_HEIGHT;
  gameStatus: string = GAME_STATUS.MENU;
  bullets: Bullet[] = [];
  staticObjects: StaticDrawable[] = [];
  players: Players;
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  mainMenu = new MainMenu(this.canvasWidth, this.canvasHeight, this);
  curtin = new Curtin(this.canvasWidth, this.canvasHeight);
  playerResultsScreen = new PlayerResults(
    this.canvasWidth,
    this.canvasHeight,
    this,
  );
  gameOverTextAnimation = new GameOverTextAnimation(150, this.canvasHeight);
  gameOverScreen = new GameOverScreen(this.canvasWidth, this.canvasHeight);
  gameInfo = new GameInfoCanvas(this.canvasWidth, this.canvasHeight);
  levelsRecipe: LevelRecipe[];
  explosions: ExplosionAnimationFrames[] = [];
  enemyTanks: EnemyTank[] = [];
  enemyTanksList: EnemyTankTypes[] = [];
  values: Value[] = [];
  destroyedEnemyTanksList: DestroyedBy[] = [];
  findings: Finding[] = [];
  findingsList: FindingsTypes[] = [
    "Tank",
    "Grenade",
    "Helmet",
    "Stopwatch",
    "Shovel",
    "Star",
  ];
  timeBlockade = false;
  drawEnemyTanksSensors = false;
  startTimer = new Timer();
  enemyTankSpawnTimer = new Timer();
  blockEnemyTanksTimer = new Timer();
  playerDestructionTimer = new Timer();

  //!! Check if all enemy tanks destroyed and finish the round

  constructor(players: 1 | 2, levels: LevelRecipe[]) {
    this.levelsRecipe = levels;
    this.players = new Players(players);
  }

  setGameStatus(status: keyof typeof GAME_STATUS) {
    this.gameStatus = GAME_STATUS[status];
  }

  initGame(context: CanvasRenderingContext2D) {
    this.lastTime = performance.now();
    this.renderCtx = context;
    this.renderer = new Renderer(this.renderCtx, this);
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  private gameLoop(timestamp: number) {
    const deltaTime = (timestamp - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = timestamp;
    this.renderer?.renderGame(deltaTime);
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  startGame() {
    this.staticObjectsCanvas = new StaticElementsCanvas(this);
    this.staticObjectsCanvas.createStaticObjects();
    this.enemyTanksList = [...levels[this.currentLevelIndex].enemyTanksList];
    this.handleGameInfoUpdate();
    this.resetClassesValues();

    this.startTimer.start(() => {
      this.curtin.unlockCurtin();
      this.handlePlayerTankSpawn("player1");
      // ! What if we have two players
      this.addNewEnemyTank();
      this.handleEnemyTankSpawn();
    }, CORTIN_ANIMATION_DELAY);

    this.gameStatus = GAME_STATUS.CURTIN;
  }

  getGameStatus() {
    return this.gameStatus;
  }

  getCurrentLevelNumber() {
    return this.currentLevelIndex + 1;
  }

  getCurrentLevelIndex() {
    return this.currentLevelIndex;
  }

  setNextLevelNumber() {
    this.currentLevelIndex += 1;
  }

  private handleEnemyTankSpawn() {
    this.enemyTankSpawnTimer.start(
      () => {
        if (this.enemyTanksList.length && this.enemyTanks.length < 4) {
          this.addNewEnemyTank();
        }
      },
      ENEMY_TANKS_SPAWN_INTERVAL,
      true,
    );
  }

  private checkSpawnPointIsBlocked(x: number, y: number) {
    const spawnPointCollisionZone = new ElementCollisionZone(
      new Coordinates(x, y),
      ENEMY_TANK_IMAGE_SIZE,
      ENEMY_TANK_IMAGE_SIZE,
    );
    const tanks = [...this.enemyTanks, ...this.players.getActivePlayersTanks()];

    for (const tank of tanks) {
      const tankCollisionZone = tank.getCollisionZone();

      if (
        spawnPointCollisionZone.A.x < tankCollisionZone.B.x &&
        spawnPointCollisionZone.B.x > tankCollisionZone.A.x &&
        spawnPointCollisionZone.A.y < tankCollisionZone.C.y &&
        spawnPointCollisionZone.C.y > tankCollisionZone.A.y
      ) {
        return true;
      }
    }

    return false;
  }

  private addNewEnemyTank() {
    const index = Math.floor(Math.random() * this.enemyTanksList.length);

    let xPos: number;
    let yPos: number;

    do {
      const { x, y } = this.getSpawnCoordinates(Math.floor(Math.random() * 3));
      xPos = x;
      yPos = y;
    } while (this.checkSpawnPointIsBlocked(xPos, yPos));

    this.enemyTanks.push(
      new EnemyTank(
        xPos,
        yPos,
        ENEMY_TANK_IMAGE_SIZE,
        ENEMY_TANK_IMAGE_SIZE,
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
        return { x: 21, y: 5 };
      }
      case 1: {
        return { x: 164, y: 5 };
      }
      case 2: {
        return { x: 308, y: 5 };
      }
      default: {
        return { x: 21, y: 5 };
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
    this.gameInfo.update(
      this.enemyTanksList.length,
      this.players,
      this.getCurrentLevelNumber(),
    );
  }

  handlePlayerTankSpawn(owner: Owner, delay: number = 0) {
    this.playerDestructionTimer.start(() => {
      if (owner && this.players[`${owner}`]) {
        if (
          this.players[`${owner}`]!.getPlayerLivesLeft() > 0 &&
          !this.players[`${owner}`]!.playerTank
        ) {
          this.players[`${owner}`]!.playerTank = new PlayerTank(
            116,
            292,
            PLAYER_TANK_IMAGE_SIZE,
            PLAYER_TANK_IMAGE_SIZE,
            player1TankTextures as TankTypesTextures,
            0,
            owner,
            this,
          );
          this.players[`${owner}`]?.subtractPlayerLife();
        }
        this.handleGameInfoUpdate();
      }
    }, delay);
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
          new ExplosionAnimationFrames(
            smallExplosionTextures.animationTexture,
            smallExplosionTextures.textureSize,
            EXPLOSION_ANIMATION_SPEED,
            xPos,
            yPos,
          ),
        );
        this.bullets.splice(i, 1);
        i--;
      }
    }
  }

  //Handle findings

  generateFinding() {
    const index = Math.floor(Math.random() * this.findingsList.length);
    const xPos = Math.floor(Math.random() * 300 + 4);
    const yPos = Math.floor(Math.random() * 240 + 20);
    switch (this.findingsList[index]) {
      case "Tank": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.tankFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
      case "Grenade": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.grenadeFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
      case "Helmet": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.helmetFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
      case "Stopwatch": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.stopwatchFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
      case "Shovel": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.shovelFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
      case "Star": {
        this.findings.push(
          new Finding(
            this.findingsList[index],
            xPos,
            yPos,
            findingsTextures.starFindingTexture,
            FINDING_IMAGE_SIZE,
          ),
        );
        break;
      }
    }
  }

  handleProcessRewardFromFinding(owner: Owner, findingType: FindingsTypes) {
    switch (findingType) {
      case "Tank": {
        this.handleAddPlayerLive(owner);
        break;
      }
      case "Grenade": {
        this.handleDestroyAllEnemyTanks();
        break;
      }
      case "Helmet": {
        this.handleMakePlayerIndestructible(owner, 10);
        break;
      }
      case "Stopwatch": {
        this.handleBlockAllEnemyTanks(10);
        break;
      }
      case "Shovel": {
        this.handleArmorEagle(10);
        break;
      }
      case "Star": {
        this.handlePlayerTankUpdate(owner);
        break;
      }
    }
  }

  private handleDestroyAllEnemyTanks() {
    for (let i = this.enemyTanks.length - 1; i >= 0; i--) {
      this.enemyTanks[i].processHit("");
    }
  }

  private handleAddPlayerLive(owner: Owner) {
    if (owner) {
      this.players[`${owner}`]?.addPlayerLivesLeft();
      this.handleGameInfoUpdate();
    }
  }

  private handleMakePlayerIndestructible(owner: Owner, time: number) {
    if (owner) {
      this.players[`${owner}`]?.playerTank?.madeIndestructible(time);
    }
  }

  private setAllEnemyTanksTimeBlockade(blockedByTime: boolean) {
    this.enemyTanks.forEach((enemyTank) => {
      enemyTank.setIsTimeBlocked(blockedByTime);
    });
  }

  private handleBlockAllEnemyTanks(time: number) {
    this.timeBlockade = true;

    this.blockEnemyTanksTimer.start(() => {
      this.timeBlockade = false;
      this.setAllEnemyTanksTimeBlockade(false);
    }, time);

    this.setAllEnemyTanksTimeBlockade(true);
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
    if (
      this.players.player1 &&
      this.players.player1.isPlayerDestroyed() &&
      !this.players.player2
    ) {
      return true;
    }
    if (
      this.players.player1 &&
      this.players.player1.isPlayerDestroyed() &&
      this.players.player2 &&
      this.players.player2.isPlayerDestroyed()
    ) {
      return true;
    }
    return false;
  }

  addDestroyedEnemyTankValue(destroyedBy: Owner, tankType: EnemyTankTypes) {
    const value = ENEMY_TANKS_SETTINGS[tankType].value;
    if (destroyedBy) {
      this.players[destroyedBy]?.addPlayerScore(value);
    }
  }

  getDestroyedEnemyTanksList() {
    return this.destroyedEnemyTanksList;
  }

  resetGame(gameOver: boolean) {
    this.resetGameValues();
    if (gameOver) {
      this.players.resetPlayers();
    }

    this.gameStatus = GAME_STATUS.MENU;
  }

  private resetGameValues() {
    this.bullets = [];
    this.staticObjects = [];
    this.staticObjectsCanvas = null;
    this.explosions = [];
    this.enemyTanks = [];
    this.enemyTanksList = [];
    this.values = [];
    this.destroyedEnemyTanksList = [];
    this.findings = [];
    this.findingsList = [];
    this.currentLevelIndex = 0;
    this.staticObjectsCanvas = null;
  }

  private resetClassesValues() {
    this.curtin.reset();
    this.gameOverTextAnimation.reset();
    this.gameOverScreen.reset();
    this.playerResultsScreen.reset();
  }
}
