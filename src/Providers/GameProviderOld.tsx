import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Tank } from '../Classes/Tank/Tank';
import { Direction } from '../Types/Types';
//import { userSmallTankTextures } from '../Textures/TanksTextures/TanksTextures';
import { StaticElementsCanvas } from '../Classes/StaticElementsCanvas/StaticElementsCanvas';
import { level1 } from '../Levels/Levels';
import { Bullet } from '../Classes/Bullet/Bullet';
/*

export const GameContext = createContext({
  playerTank: new Tank(156, 156, 24, 24, userSmallTankTextures, level1.staticObjects, []),
  handleChangeDirection: (direction: Direction) => {},
  handleShot: () => {},
  staticElements: new StaticElementsCanvas(312, 312, level1.staticObjects),
  bulletObjects: [] as Bullet[],
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const [bulletObjects, setBulletsObjects] = useState<Bullet[]>([]);
  const [playerTank, setPlayerTank] = useState<Tank>(new Tank(200, 156, 22, 22, userSmallTankTextures, level1.staticObjects, bulletObjects));
  const [staticElements, setStaticElements] = useState(new StaticElementsCanvas(312, 312, level1.staticObjects));

  const handleChangeDirection = useCallback(
    (direction: Direction) => {
      playerTank.controls.setDirection(direction);
      setPlayerTank(playerTank);
    },
    [playerTank],
  );
  const handleShot = useCallback(() => {
    playerTank && playerTank.fire();
  }, [playerTank]);

  const context = {
    playerTank,
    staticElements,
    handleChangeDirection,
    handleShot,
    bulletObjects,
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
*/

