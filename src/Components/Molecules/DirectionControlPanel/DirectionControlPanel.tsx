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

const DirectionControlPanel = () => {
  return (
    <DirectionControlPanelWrapper>
      <EdgeRow>
        <StyledControlButton>
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
