import { useContext } from 'react';
import { GameContext } from '../../../Providers/GameProvider';
import { StyledControlButton } from '../../Atoms/ControlButton/ControlButton.styles';
import { StyledEllipse } from '../../Atoms/Elipse/Elipse';
import { FireControlPanelWrapper } from './FireControlPanel.styles';

const FireControlPanel = () => {
  const { handleShot } = useContext(GameContext);
  return (
    <FireControlPanelWrapper>
      <StyledControlButton onPointerDown={() => handleShot()}>
        <StyledEllipse />
      </StyledControlButton>
    </FireControlPanelWrapper>
  );
};

export default FireControlPanel;

