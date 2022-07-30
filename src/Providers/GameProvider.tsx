import { createContext, PropsWithChildren, useState } from 'react';
import { Tank } from '../Classes/Tank/Tank';
import { Direction } from '../Types/Types';
import { userSmallTankTextures } from '../Textures/TanksTextures/TanksTextures';

export const GameContext = createContext({
  playerTank: new Tank(156, 156, 24, 24, userSmallTankTextures),
  handleChangeDirection: (direction: Direction) => {},
});

const GameProvider = (props: PropsWithChildren<any>) => {
  const [playerTank, setPlayerTank] = useState<Tank>(new Tank(156, 156, 24, 24, userSmallTankTextures));

  const handleChangeDirection = (direction: Direction) => {
    playerTank.controls.setDirection(direction);
    setPlayerTank(playerTank);
  };

  const context = {
    playerTank,
    handleChangeDirection,
  };

  return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
};

export default GameProvider;

/*
useEffect(()=> {
  if(playerSmallTank){
  const playerTank = new Tank(100, 100, 24, 24, playerSmallTank);
  setTest(playerTank)
  }
},[playerSmallTank]) */

