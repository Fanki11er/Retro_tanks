import { player1smallTankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { Bullet } from '../Bullet/Bullet';
import { Curtin } from '../Curtin/Curtin';
import { GameInfoCanvas } from '../GameInfoCanvas/GameInfoCanvas';
import { GameOverAnimation } from '../GameOverAnimation/GameOverAnimation';
import { Level } from '../Level/Level';
import { StaticElementsCanvas } from '../StaticElementsCanvas/StaticElementsCanvas';
import { Tank } from '../Tank/Tank';

export class Game {
  gameStatus = 'Paused';
  bullets: Bullet[] = [];
  levels: Level[];
  playerTanks: Tank[] = [];
  staticObjectsCanvas: StaticElementsCanvas | null = null;
  curtin = new Curtin(372, 320);
  gameOverAnimation = new GameOverAnimation(150, 320);
  currentLevel: number = 0;
  gameInfo = new GameInfoCanvas(372, 320);

  //!! Get height and width from the constructor

  constructor(players: 1 | 2, levels: Level[]) {
    this.levels = levels;
  }

  startGame(renderCtx: CanvasRenderingContext2D) {
    this.staticObjectsCanvas = new StaticElementsCanvas(372, 320, this.levels[this.currentLevel].staticObjects);
    this.gameInfo.update(20, 3, 3, 2, 1);

    setTimeout(() => {
      this.curtin.isBlocked = false;
      this.playerTanks.push(new Tank(200, 156, 20, 20, player1smallTankTextures, this.levels[this.currentLevel].staticObjects, this.bullets));
    }, 1000);
    this.animate(renderCtx);
  }

  animate(renderCtx: CanvasRenderingContext2D) {
    renderCtx?.clearRect(0, 0, 372, 320);
    if (this.gameStatus === 'Paused') {
      renderCtx && this.curtin.drawCurtin(renderCtx, 1, this.currentLevel);
    }
    if (this.gameStatus === 'GameOver') {
      //this.gameInfo.drawGameOverInfo();
      this.gameOverAnimation.animate(renderCtx, 5);
    }
    renderCtx && this.gameInfo.draw(renderCtx);
    this.playerTanks[0] && renderCtx && this.playerTanks[0].draw(renderCtx);
    renderCtx && this.staticObjectsCanvas && this.staticObjectsCanvas.draw(renderCtx);
    renderCtx &&
      this.bullets.forEach((bullet) => {
        bullet.draw(renderCtx);
      });
    if (this.staticObjectsCanvas?.isEagleDestroyed) {
      this.gameStatus = 'GameOver';
    }

    requestAnimationFrame(() => this.animate(renderCtx));
  }
}

