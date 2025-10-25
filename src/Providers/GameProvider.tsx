import { useCallback, useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import type { Direction } from "../Types/Types";
import { Game } from "../Classes/Game/Game";
import { levels } from "../Levels/Levels";
import { GameContext } from "../contexts/GameContext";

const GameProvider = (props: PropsWithChildren) => {
  const { current: game } = useRef(new Game(1, levels));

  const handleChangeDirection = useCallback(
    (direction: Direction) => {
      if (game.players.player1) {
        game.players.player1.playerTank?.controls.setDirection(direction);
      }
    },
    [game]
  );
  const handleShot = useCallback(() => {
    if (game.players.player1) {
      game.players.player1.playerTank?.fire();
    }
  }, [game]);

  const context = {
    handleChangeDirection,
    handleShot,
    game,
  };

  useEffect(() => {
    const move = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        handleChangeDirection("Forwards");
        return;
      }
      if (e.key === "ArrowDown") {
        handleChangeDirection("Backwards");
        return;
      }
      if (e.key === "ArrowLeft") {
        handleChangeDirection("Left");
        return;
      }
      if (e.key === "ArrowRight") {
        handleChangeDirection("Right");
        return;
      }
    };
    const stopMove = (e: KeyboardEvent) => {
      if (e.key !== " ") {
        handleChangeDirection("None");
      }
    };
    window.addEventListener("keydown", (e) => move(e));
    window.addEventListener("keyup", (e) => stopMove(e));
    return () => {
      window.removeEventListener("keydown", (e) => move(e));
      window.removeEventListener("keyup", (e) => stopMove(e));
    };
  }, [handleChangeDirection]);

  useEffect(() => {
    const hitFire = (e: KeyboardEvent) => {
      if (e.key === " ") {
        handleShot();
      }
    };
    window.addEventListener("keydown", (e) => hitFire(e));
    return () => window.removeEventListener("keydown", (e) => hitFire(e));
  }, [handleShot]);

  return (
    <GameContext.Provider value={context}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
