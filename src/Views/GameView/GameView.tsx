import DirectionControlPanel from "../../Components/Molecules/DirectionControlPanel/DirectionControlPanel";
import FireControlPanel from "../../Components/Molecules/FireControlPanel/FireControlPanel";
import Board from "../../Components/Organisms/Board/Board";
import { GameViewWrapper } from "./GameView.styles";

const GameView = () => {
  return (
    <GameViewWrapper>
      <FireControlPanel />
      <Board />
      <DirectionControlPanel />
    </GameViewWrapper>
  );
};

export default GameView;
