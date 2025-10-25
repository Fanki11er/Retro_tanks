import { useContext, useEffect, useRef } from "react";
import { StyledCanvas } from "./Canvas.styles";
import { GameContext } from "../../../contexts/GameContext";

const Canvas = () => {
  const { game } = useContext(GameContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      const animate = () => {
        if (renderCtx) {
          game.renderGame(renderCtx);
        }

        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [game]);

  return <StyledCanvas ref={canvasRef} width={372} height={320} />;
};

export default Canvas;
