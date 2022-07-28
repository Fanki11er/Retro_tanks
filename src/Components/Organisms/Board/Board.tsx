import { Direction } from "../../../Types/Types";
import {
  BottomEdgePanel,
  LeftEdgePanel,
  TopEdgePanel,
} from "../../Atoms/EdgePanels/EdgePanels";
import Canvas from "../../Molecules/Canvas/Canvas";
import RightGamePanel from "../../Molecules/RightGamePanel/RightGamePanel";
import { BoardWrapper } from "./Board.styles";
interface BoardProps{
  playerTankDirection: Direction
}
const Board = (props: BoardProps) => {
  const {playerTankDirection} = props;
  return (
    <BoardWrapper>
      <LeftEdgePanel />
      <TopEdgePanel />
      <RightGamePanel />
      <BottomEdgePanel />
      <Canvas playerTankDirection={playerTankDirection}/>
    </BoardWrapper>
  );
};

export default Board;
