import { useEffect, useRef, useState } from "react";
import { StyledCanvas } from "./Canvas.styles";
import small_tank_image from "../../../assets/images/Light_tank.svg";

const Canvas = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [playerSmallTank, setPlayerSmallTank] =
    useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smallTankImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context && playerSmallTank) {
      context.drawImage(playerSmallTank, 200, 200);
    }
  }, [context, playerSmallTank]);

  useEffect(() => {
    if (smallTankImage.current) {
      setPlayerSmallTank(smallTankImage.current);
    }
  }, []);

  return (
    <>
      <StyledCanvas ref={canvasRef} width={312} height={312} />
      <img
        src={small_tank_image}
        ref={smallTankImage}
        style={{ display: "none" }}
        alt={"Player small tank"}
      />
    </>
  );
};

export default Canvas;
