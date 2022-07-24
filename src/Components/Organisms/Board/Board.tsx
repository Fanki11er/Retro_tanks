import { BottomEdgePanel, LeftEdgePanel, TopEdgePanel } from "../../Atoms/EdgePanels/EdgePanels";
import RightGamePanel from "../../Molecules/RightGamePanel/RightGamePanel";
import { BoardWrapper } from "./Board.styles";

const Board = () => {
  return (
    <BoardWrapper>
      <LeftEdgePanel />
      <TopEdgePanel />
      <RightGamePanel />
      <BottomEdgePanel />
    </BoardWrapper>
  );
};

export default Board;
