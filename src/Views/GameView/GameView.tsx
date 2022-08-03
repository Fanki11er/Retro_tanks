import DirectionControlPanel from '../../Components/Molecules/DirectionControlPanel/DirectionControlPanel';
import FireControlPanel from '../../Components/Molecules/FireControlPanel/FireControlPanel';
import Board from '../../Components/Organisms/Board/Board';
import GameProvider from '../../Providers/GameProvider';
import { GameViewWrapper } from './GameView.styles';

const GameView = () => {
  return (
    <GameViewWrapper>
      <GameProvider>
        <FireControlPanel />
        <Board />
        <DirectionControlPanel />
      </GameProvider>
    </GameViewWrapper>
  );
};

export default GameView;

