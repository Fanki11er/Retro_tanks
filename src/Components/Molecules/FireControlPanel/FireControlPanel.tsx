import { StyledControlButton } from "../../Atoms/ControlButton/ControlButton.styles";
import { StyledEllipse } from "../../Atoms/Elipse/Elipse";
import { FireControlPanelWrapper } from "./FireControlPanel.styles";

const FireControlPanel = () => {
  return (
    <FireControlPanelWrapper>
      <StyledControlButton>
        <StyledEllipse />
      </StyledControlButton>
    </FireControlPanelWrapper>
  );
};

export default FireControlPanel;
