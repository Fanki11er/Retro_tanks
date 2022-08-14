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
      game.startGame();
      const animate = () => {
        game.playerTanks[0].update();
        renderCtx?.clearRect(0, 0, 312, 312);
        renderCtx && game.playerTanks[0].draw(renderCtx);
        renderCtx && game.staticObjectsCanvas && game.staticObjectsCanvas.draw(renderCtx);
        renderCtx &&
          game.bullets.forEach((bullet) => {
            bullet.draw(renderCtx);
          });
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [context, game]);

  return <StyledCanvas ref={canvasRef} width={312} height={312} />;
};

export default Canvas;

