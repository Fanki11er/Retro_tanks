import { BottomEdgePanel, LeftEdgePanel, TopEdgePanel } from '../../Atoms/EdgePanels/EdgePanels';
import Canvas from '../../Molecules/Canvas/Canvas';
import RightGamePanel from '../../Molecules/RightGamePanel/RightGamePanel';
import { BoardWrapper } from './Board.styles';

const Board = () => {
  return (
    <BoardWrapper>
      <LeftEdgePanel />
      <TopEdgePanel />
      <RightGamePanel />
      <BottomEdgePanel />
      <Canvas />
    </BoardWrapper>
  );
};

export default Board;

