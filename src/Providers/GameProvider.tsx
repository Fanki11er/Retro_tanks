import { createContext, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { Direction } from '../Types/Types';
import { Game } from '../Classes/Game/Game';
import { levels } from '../Levels/Levels';

export const GameContext = createContext({
  handleChangeDirection: (direction: Direction) => {},
  handleShot: () => {},
  game: new Game(1, levels),
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const { current: game } = useRef(new Game(1, levels));

  const handleChangeDirection = useCallback(
    (direction: Direction) => {
      game.player1Tanks && game.player1Tanks.controls.setDirection(direction);
    },
    [game],
  );
  const handleShot = useCallback(() => {
    game.player1Tanks && game.player1Tanks.fire();
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
      if (e.key !== ' ') {
        handleChangeDirection('None');
      }
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

