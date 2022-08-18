import { userSmallTankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { Bullet } from '../Bullet/Bullet';
import { Curtin } from '../Curtin/Curtin';
import { GameInfoCanvas } from '../GameInfoCanvas/GameInfoCanvas';
import { indestructibleTextures } from '../IndestructibleTextures/IndestructibleTextures';
import { Level } from '../Level/Level';
import { spawnPointTextures } from '../SpawnPointTextures/SpawnPointTextures';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';
import { Tank } from '../Tank/Tank';

export class Game {
  gameStatus = 'Paused';
  bullets: Bullet[] = [];
  levels: Level[];
  playerTanks: Tank[] = [];
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  currentLevel: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);

  //!! Get height and width from the constructor

  constructor(players: 1 | 2, levels: Level[]) {
    this.levels = levels;
  }

  startGame() {
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this.levels[this.currentLevel].staticObjects);
    this.gameInfo.update(20, 3, 3, 2, 1);

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.playerTanks.push(
        new Tank(
          200,
          156,
          22,
          22,
          userSmallTankTextures,
          spawnPointTextures,
          indestructibleTextures,
          this.levels[this.currentLevel].staticObjects,
          this.bullets,
        ),
      );
    }, 1000);
  }
}

