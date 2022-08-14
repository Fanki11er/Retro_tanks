import { userSmallTankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { Bullet } from '../Bullet/Bullet';
import { Level } from '../Level/Level';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';
import { Tank } from '../Tank/Tank';

export class Game {
  bullets: Bullet[] = [];
  levels: Level[];
  playerTanks: Tank[] = [];
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  currentLevel: number = 0;

  constructor(players: 1 | 2, levels: Level[]) {
    this.levels = levels;
  }

  startGame() {
    this.playerTanks.push(new Tank(200, 156, 22, 22, userSmallTankTextures, this.levels[this.currentLevel].staticObjects, this.bullets));
    this.staticObjectsCanvas = new StaticElementsCanvas(312, 312, this.levels[this.currentLevel].staticObjects);
  }
}

