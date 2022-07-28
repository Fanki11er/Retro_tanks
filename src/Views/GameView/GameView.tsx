import { useState } from "react";
import DirectionControlPanel from "../../Components/Molecules/DirectionControlPanel/DirectionControlPanel";
import FireControlPanel from "../../Components/Molecules/FireControlPanel/FireControlPanel";
import Board from "../../Components/Organisms/Board/Board";
import GameProvider from "../../Providers/GameProvider";
import { Direction } from "../../Types/Types";
import { GameViewWrapper } from "./GameView.styles";

const GameView = () => {
  const [playerTankDirection, setPlayerTankDirection] = useState<Direction>('None');

  const handleChangeDirection = (direction: Direction)=> {
    console.log(direction, 'STSRSR')
    setPlayerTankDirection(direction)
  }
  return (
    <GameViewWrapper>
      <GameProvider>
        
      <FireControlPanel />
      <Board playerTankDirection={playerTankDirection}/>
      <DirectionControlPanel handleChangeDirection={handleChangeDirection}/>
    
      </GameProvider>
    </GameViewWrapper>
  );
};

export default GameView;
