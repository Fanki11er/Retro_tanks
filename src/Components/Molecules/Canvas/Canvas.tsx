import { useContext, useEffect, useRef, useState } from 'react';
import { StyledCanvas } from './Canvas.styles';
import { Direction } from '../../../Types/Types';
import { GameContext } from '../../../Providers/GameProvider';

interface CanvasProps {
  playerTankDirection: Direction;
}

const Canvas = (props: CanvasProps) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { playerTank } = useContext(GameContext);

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
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [context, playerTank]);

  return <StyledCanvas ref={canvasRef} width={312} height={312} />;
};

export default Canvas;

