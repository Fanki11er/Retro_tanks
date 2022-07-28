import { useContext } from "react";
import { GameContext } from "../../../Providers/GameProvider";
import { Direction } from "../../../Types/Types";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "../../Atoms/Arrow/Arrow";
import { StyledControlButton } from "../../Atoms/ControlButton/ControlButton.styles";
import {
  DirectionControlPanelWrapper,
  EdgeRow,
  MiddleRow,
} from "./DirectionControlPanel.styles";

interface DirectionProps{
  handleChangeDirection: (direction: Direction)=> void;
}
const DirectionControlPanel = (props: DirectionProps) => {
 const {handleChangeDirection} = useContext(GameContext)
  return (
    <DirectionControlPanelWrapper>
      <EdgeRow>
        <StyledControlButton onTouchStart={(e)=> {handleChangeDirection('Forwards') }} onTouchEnd={()=> handleChangeDirection('None')}>
          <ArrowUp />
        </StyledControlButton>
      </EdgeRow>
      <MiddleRow>
        <StyledControlButton>
          <ArrowLeft />
        </StyledControlButton>
        <StyledControlButton>
          <ArrowRight />
        </StyledControlButton>
      </MiddleRow>
      <EdgeRow>
        <StyledControlButton>
          <ArrowDown />
        </StyledControlButton>
      </EdgeRow>
    </DirectionControlPanelWrapper>
  );
};

export default DirectionControlPanel;
