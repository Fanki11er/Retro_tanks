import { useContext, useEffect, useRef } from "react";
import { StyledCanvas } from "./Canvas.styles";
import { GameContext } from "../../../contexts/GameContext";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";

const Canvas = () => {
  const { game } = useContext(GameContext);
  console.log("Canvas rendered");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      game.initGame(renderCtx!);
    }
  }, [game]);

  return (
    <StyledCanvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
  );
};

export default Canvas;
