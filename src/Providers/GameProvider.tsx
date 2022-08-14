import { createContext, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { Direction } from '../Types/Types';
import { level1 } from '../Levels/Levels';
import { Game } from '../Classes/Game/Game';

export const GameContext = createContext({
  handleChangeDirection: (direction: Direction) => {},
  handleShot: () => {},
  game: new Game(1, [level1]),
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const { current: game } = useRef(new Game(1, [level1]));
  //const test = game.current;

  const handleChangeDirection = useCallback(
    (direction: Direction) => {
      game.playerTanks[0].controls.setDirection(direction);
    },
    [game],
  );
  const handleShot = useCallback(() => {
    game.playerTanks[0].fire();
  }, [game]);

  const context = {
    handleChangeDirection,
    handleShot,
    game,
  };

  useEffect(() => {
    const move = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        handleChangeDirection('Forwards');
        return;
      }
      if (e.key === 'ArrowDown') {
        handleChangeDirection('Backwards');
        return;
      }
      if (e.key === 'ArrowLeft') {
        handleChangeDirection('Left');
        return;
      }
      if (e.key === 'ArrowRight') {
        handleChangeDirection('Right');
        return;
      }
    };
    const stopMove = (e: KeyboardEvent) => {
      handleChangeDirection('None');
    };
    window.addEventListener('keydown', (e) => move(e));
    window.addEventListener('keyup', (e) => stopMove(e));
    return () => {
      window.removeEventListener('keydown', (e) => move(e));
      window.removeEventListener('keyup', (e) => stopMove(e));
    };
  }, [handleChangeDirection]);

  useEffect(() => {
    const hitFire = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        handleShot();
      }
    };
    window.addEventListener('keydown', (e) => hitFire(e));
    return () => window.removeEventListener('keydown', (e) => hitFire(e));
  }, [handleShot]);

  return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
};

export default GameProvider;

