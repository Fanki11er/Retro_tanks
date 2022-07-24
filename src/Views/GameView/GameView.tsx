import DirectionControlPanel from "../../Components/Molecules/DirectionControlPanel/DirectionControlPanel";
import FireControlPanel from "../../Components/Molecules/FireControlPanel/FireControlPanel";
import { GameViewWrapper } from "./GameView.styles";

const GameView = () => {
  return (
    <GameViewWrapper>
      <FireControlPanel />
      <div></div>
      <DirectionControlPanel />
    </GameViewWrapper>
  );
};

export default GameView;
