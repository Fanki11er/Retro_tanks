import { useContext, useEffect, useRef } from 'react';
import { StyledCanvas } from './Canvas.styles';
import { GameContext } from '../../../Providers/GameProvider';

const Canvas = () => {
  const { game } = useContext(GameContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');
      const animate = () => {
        renderCtx?.clearRect(0, 0, 372, 320);
        if (game.gameStatus === 'Ready') {
          game.startGame();
        }

        if (game.gameStatus === 'Started' || game.gameStatus === 'ShowingResults') {
          renderCtx && game.curtin.drawCurtin(renderCtx, 1, game.currentLevelNumber + 1);
          /*if (!game.curtin.isClosed) {
            game.gameStatus = 'Started';
          }*/
        }
        if (game.staticObjectsCanvas?.isEagleDestroyed) {
          game.gameStatus = 'GameOver';
          renderCtx && game.gameOverAnimation.animate(renderCtx, 5);
        }
        game.removeDestroyedTanks();
        game.removeDestroyedBullets();
        renderCtx && game.gameInfo.draw(renderCtx);
        game.players.player1?.playerTank && renderCtx && game.players.player1.playerTank.draw(renderCtx);
        renderCtx && game.renderEnemyTanks(renderCtx);
        renderCtx && game.staticObjectsCanvas && game.staticObjectsCanvas.draw(renderCtx);
        /*renderCtx &&
          game.bullets.forEach((bullet) => {
            bullet.draw(renderCtx);
          });*/
        renderCtx && game.renderBullets(renderCtx);
        renderCtx && game.renderExplosions(renderCtx);
        renderCtx && game.renderValues(renderCtx);
        renderCtx && game.renderFindings(renderCtx);

        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [game]);

  return <StyledCanvas ref={canvasRef} width={372} height={320} />;
};

export default Canvas;

