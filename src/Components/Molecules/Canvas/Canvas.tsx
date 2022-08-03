import { useContext, useEffect, useRef, useState } from 'react';
import { StyledCanvas } from './Canvas.styles';
import { GameContext } from '../../../Providers/GameProvider';

const Canvas = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { playerTank, staticElements, bulletObjects } = useContext(GameContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }

      const animate = () => {
        playerTank.update();
        renderCtx?.clearRect(0, 0, 312, 312);
        renderCtx && playerTank.draw(renderCtx);
        renderCtx && staticElements.draw(renderCtx);
        renderCtx &&
          bulletObjects.forEach((bullet) => {
            bullet.draw(renderCtx);
          });
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [context, playerTank, staticElements, bulletObjects]);

  return <StyledCanvas ref={canvasRef} width={312} height={312} />;
};

export default Canvas;

