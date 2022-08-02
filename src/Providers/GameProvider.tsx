import { createContext, PropsWithChildren, useState } from 'react';
import { Tank } from '../Classes/Tank/Tank';
import { Direction } from '../Types/Types';
import { userSmallTankTextures } from '../Textures/TanksTextures/TanksTextures';
import { StaticElementsCanvas } from '../Classes/StaticElementsCanvas/StaticElementsCanvas';
import { Level1 } from '../Levels/Levels';
import { Bullet } from '../Classes/Bullet/Bullet';

export const GameContext = createContext({
  playerTank: new Tank(156, 156, 24, 24, userSmallTankTextures, Level1.staticObjects, []),
  handleChangeDirection: (direction: Direction) => {},
  handleShot: () => {},
  staticElements: new StaticElementsCanvas(312, 312, Level1.staticObjects),
  bulletObjects: [] as Bullet[],
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const [bulletObjects, setBulletsObjects] = useState<Bullet[]>([]);
  const [playerTank, setPlayerTank] = useState<Tank>(new Tank(156, 156, 24, 24, userSmallTankTextures, Level1.staticObjects, bulletObjects));
  const [staticElements, setStaticElements] = useState(new StaticElementsCanvas(312, 312, Level1.staticObjects));

  const handleChangeDirection = (direction: Direction) => {
    playerTank.controls.setDirection(direction);
    setPlayerTank(playerTank);
  };
  const handleShot = () => {
    playerTank && playerTank.fire();
  };

  const context = {
    playerTank,
    staticElements,
    handleChangeDirection,
    handleShot,
    bulletObjects,
  };

  return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
};

export default GameProvider;

