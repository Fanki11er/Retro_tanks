import { useContext } from "react";
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
import { GameContext } from "../../../contexts/GameContext";

const DirectionControlPanel = () => {
  const { handleChangeDirection } = useContext(GameContext);
  return (
    <DirectionControlPanelWrapper>
      <EdgeRow>
        <StyledControlButton
          onPointerDown={() => {
            handleChangeDirection("Forwards");
          }}
          onPointerUp={() => handleChangeDirection("None")}
          onPointerLeave={() => handleChangeDirection("None")}
        >
          <ArrowUp />
        </StyledControlButton>
      </EdgeRow>
      <MiddleRow>
        <StyledControlButton
          onPointerDown={() => {
            handleChangeDirection("Left");
          }}
          onPointerUp={() => handleChangeDirection("None")}
          onPointerLeave={() => handleChangeDirection("None")}
        >
          <ArrowLeft />
        </StyledControlButton>
        <StyledControlButton
          onPointerDown={() => {
            handleChangeDirection("Right");
          }}
          onPointerUp={() => handleChangeDirection("None")}
          onPointerLeave={() => handleChangeDirection("None")}
        >
          <ArrowRight />
        </StyledControlButton>
      </MiddleRow>
      <EdgeRow>
        <StyledControlButton
          onPointerDown={() => {
            handleChangeDirection("Backwards");
          }}
          onPointerUp={() => handleChangeDirection("None")}
          onPointerLeave={() => handleChangeDirection("None")}
        >
          <ArrowDown />
        </StyledControlButton>
      </EdgeRow>
    </DirectionControlPanelWrapper>
  );
};

export default DirectionControlPanel;
