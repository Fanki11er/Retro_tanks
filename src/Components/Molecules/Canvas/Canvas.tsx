import { useContext, useEffect, useRef, useState } from 'react';
import { StyledCanvas } from './Canvas.styles';
import { GameContext } from '../../../Providers/GameProvider';

const Canvas = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const { game } = useContext(GameContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');
      if (renderCtx) {
        setContext(renderCtx);
      }
      game.startGame(renderCtx!);
      /*const animate = () => {
        //game.playerTanks[0] && game.playerTanks[0].update();
        renderCtx?.clearRect(0, 0, 372, 320);
        if (game.gameStatus === 'Paused') {
          renderCtx && game.curtin.drawCurtin(renderCtx, 1, game.currentLevel);
        }
        renderCtx && game.gameInfo.draw(renderCtx);
        game.playerTanks[0] && renderCtx && game.playerTanks[0].draw(renderCtx);
        renderCtx && game.staticObjectsCanvas && game.staticObjectsCanvas.draw(renderCtx);
        renderCtx &&
          game.bullets.forEach((bullet) => {
            bullet.draw(renderCtx);
          });

        requestAnimationFrame(animate);
      };
      animate();*/
    }
  }, [context, game]);

  return <StyledCanvas ref={canvasRef} width={372} height={320} />;
};

export default Canvas;

