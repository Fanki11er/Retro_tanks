import { createContext, PropsWithChildren, useState } from 'react';
import { Tank } from '../Classes/Tank/Tank';
import small_tank_image from "../assets/images/Light_tank.svg";
import { Direction } from '../Types/Types';

const img = new Image();
img.src = small_tank_image;

  export const GameContext = createContext({
 
    playerTank: new Tank(100, 100, 24, 24, new Image()),
   handleChangeDirection: (direction: Direction)=> {} 
  });
  
  const GameProvider = (props: PropsWithChildren<any>) => {

    const [playerTank, setPlayerTank] = useState<Tank>(new Tank(100, 100, 24, 24, img));

    const handleChangeDirection = (direction: Direction) => {
        playerTank.controls.setDirection(direction)
        setPlayerTank(playerTank)
        
    }
   
    const context = {

      playerTank,
      handleChangeDirection

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