import type { Game } from "../../Classes/Game/Game";

import { Value } from "../../Classes/Value/Value";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GAME_STATUS } from "../../constants";
import type { Owner } from "../../Types/Types";

export class Renderer {
  private canvasWidth = CANVAS_WIDTH;
  private canvasHeight = CANVAS_HEIGHT;
  private renderCtx: CanvasRenderingContext2D;
  private game: Game;

  //   private enemyTankSpawnTimer = new Timer();
  //   private blockEnemyTanksTimer = new Timer();
  //   private playerDestructionTimer = new Timer();

  constructor(renderCtx: CanvasRenderingContext2D, game: Game) {
    this.renderCtx = renderCtx;
    this.game = game;
  }

  renderGame(deltaTime: number) {
    this.game.startTimer.update(deltaTime);
    this.game.enemyTankSpawnTimer.update(deltaTime);
    this.game.blockEnemyTanksTimer.update(deltaTime);
    this.game.playerDestructionTimer.update(deltaTime);

    this.renderCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.game.getGameStatus() === GAME_STATUS.MENU) {
      this.game.mainMenu.draw(
        this.renderCtx,
        this.game.players.player1?.getPlayerScore() || 0,
        20000,
      );
    }

    if (this.game.getGameStatus() === GAME_STATUS.READY) {
      this.game.startGame();
    }

    if (this.game.getGameStatus() === GAME_STATUS.CURTIN) {
      const animationEnded = this.game.curtin.drawCurtin(
        this.renderCtx,
        1,
        this.game.getCurrentLevelNumber(),
      );
      //!! Add level number

      if (animationEnded) {
        this.game.setGameStatus("STARTED");
      }
    }

    if (this.game.checkForGameOver()) {
      const gameOverTextAnimationEnded =
        this.game.gameOverTextAnimation.animate(this.renderCtx, 5);
      if (
        gameOverTextAnimationEnded &&
        this.game.getGameStatus() !== GAME_STATUS.GAME_OVER
      ) {
        this.game.setGameStatus("GAME_OVER");
      }
      //this.resetGame();
      //Show results screen
      //Show game over screen
      // }
    }

    if (this.game.getGameStatus() === GAME_STATUS.GAME_OVER) {
      this.handleGameOver(this.renderCtx);
    }

    if (this.game.getGameStatus() === GAME_STATUS.STARTED) {
      this.playGame(deltaTime);
    }
  }

  private handleGameOver(renderCtx: CanvasRenderingContext2D) {
    let resultsAnimationEnded = false;
    let gameOverScreenAnimationEnded = false;

    resultsAnimationEnded = this.game.playerResultsScreen.drawPlayerResults(
      renderCtx,
      this.game.getCurrentLevelNumber(),
      this.game.players.player1?.getPlayerScore() || 0,
      this.game.destroyedEnemyTanksList,
    );
    if (resultsAnimationEnded) {
      gameOverScreenAnimationEnded = this.game.gameOverScreen.animate(
        renderCtx,
        1000,
      );
    }

    if (gameOverScreenAnimationEnded) {
      this.game.resetGame(true);
    }
  }

  private renderBullets(deltaTime: number) {
    this.game.bullets.forEach((bullet) => {
      bullet.draw(this.renderCtx, deltaTime);
    });
  }
  private renderExplosions(deltaTime: number) {
    for (let i = 0; i < this.game.explosions.length; i++) {
      this.game.explosions[i].animateFrames(this.renderCtx, deltaTime);
      if (this.game.explosions[i].animationEnded) {
        this.game.explosions.splice(i, 1);
        i--;
      }
    }
  }

  private renderEnemyTanks(deltaTime: number) {
    this.game.enemyTanks.forEach((enemyTank) => {
      enemyTank.draw(this.renderCtx, deltaTime);
      if (this.game.drawEnemyTanksSensors) {
        enemyTank.brain.drawSensors(this.renderCtx);
      }
    });
  }

  private renderValues(deltaTime: number) {
    for (let i = 0; i < this.game.values.length; i++) {
      if (!this.game.values[i].animationEnded) {
        this.game.values[i].showValue(this.renderCtx, deltaTime);
      } else {
        this.game.values.splice(i, 1);
        i--;
      }
    }
  }

  private renderFindings(deltaTime: number) {
    for (let i = 0; i < this.game.findings.length; i++) {
      if (this.game.findings[i].getIsTaken()) {
        const { x: xPos, y: yPos } = this.game.findings[i].getCoordinates();
        const value = this.game.findings[i].getValue();
        const isTakenBy = this.game.findings[i].getIsTaken();

        this.game.values.push(new Value(value, xPos, yPos + 12));
        this.handleAddPlayerScore(isTakenBy, value);
        this.game.handleProcessRewardFromFinding(
          isTakenBy,
          this.game.findings[i].getType(),
        );
        this.game.findings.splice(i, 1);
        i++;
      } else if (this.game.findings[i].getTimeIsOut()) {
        this.game.findings.splice(i, 1);
        i++;
      } else {
        this.game.findings[i].draw(this.renderCtx, deltaTime);
      }
    }
  }

  private handleAddPlayerScore(owner: Owner, value: number) {
    if (owner) {
      this.game.players[`${owner}`]?.addPlayerScore(value);
    }
  }

  private playGame(deltaTime: number) {
    this.game.handleBulletsHit();

    this.game.gameInfo.draw(this.renderCtx);
    this.game.staticObjectsCanvas?.draw(this.renderCtx);

    if (this.game.players.player1?.playerTank) {
      this.game.players.player1.playerTank.draw(this.renderCtx, deltaTime);
    }

    this.renderEnemyTanks(deltaTime);
    this.renderBullets(deltaTime);
    this.renderExplosions(deltaTime);
    this.renderValues(deltaTime);
    this.renderFindings(deltaTime);
  }
}
