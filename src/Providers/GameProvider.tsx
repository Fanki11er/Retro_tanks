import { createContext, PropsWithChildren, useState } from 'react';
import { Tank } from '../Classes/Tank/Tank';
import { Direction } from '../Types/Types';
import { userSmallTankTextures } from '../Textures/TanksTextures/TanksTextures';
import { StaticElementsCanvas } from '../Classes/StaticElementsCanvas/StaticElementsCanvas';
import { Level1 } from '../Levels/Levels';

export const GameContext = createContext({
  playerTank: new Tank(156, 156, 24, 24, userSmallTankTextures, Level1.staticObjects),
  handleChangeDirection: (direction: Direction) => {},
  staticElements: new StaticElementsCanvas(312, 312, Level1.staticObjects),
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const [playerTank, setPlayerTank] = useState<Tank>(new Tank(156, 156, 24, 24, userSmallTankTextures, Level1.staticObjects));
  const [staticElements, setStaticElements] = useState(new StaticElementsCanvas(312, 312, Level1.staticObjects));

  const handleChangeDirection = (direction: Direction) => {
    playerTank.controls.setDirection(direction);
    setPlayerTank(playerTank);
  };

  const context = {
    playerTank,
    staticElements,
    handleChangeDirection,
  };

  return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
};

export default GameProvider;

