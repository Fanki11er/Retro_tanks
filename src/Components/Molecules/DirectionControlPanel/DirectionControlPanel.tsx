import { useContext } from 'react';
import { GameContext } from '../../../Providers/GameProvider';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '../../Atoms/Arrow/Arrow';
import { StyledControlButton } from '../../Atoms/ControlButton/ControlButton.styles';
import { DirectionControlPanelWrapper, EdgeRow, MiddleRow } from './DirectionControlPanel.styles';

const DirectionControlPanel = () => {
  const { handleChangeDirection } = useContext(GameContext);
  return (
    <DirectionControlPanelWrapper>
      <EdgeRow>
        <StyledControlButton
          onPointerDown={(e) => {
            handleChangeDirection('Forwards');
          }}
          onPointerUp={() => handleChangeDirection('None')}
          onPointerLeave={() => handleChangeDirection('None')}
        >
          <ArrowUp />
        </StyledControlButton>
      </EdgeRow>
      <MiddleRow>
        <StyledControlButton
          onPointerDown={(e) => {
            handleChangeDirection('Left');
          }}
          onPointerUp={() => handleChangeDirection('None')}
          onPointerLeave={() => handleChangeDirection('None')}
        >
          <ArrowLeft />
        </StyledControlButton>
        <StyledControlButton
          onPointerDown={(e) => {
            handleChangeDirection('Right');
          }}
          onPointerUp={() => handleChangeDirection('None')}
          onPointerLeave={() => handleChangeDirection('None')}
        >
          <ArrowRight />
        </StyledControlButton>
      </MiddleRow>
      <EdgeRow>
        <StyledControlButton
          onPointerDown={(e) => {
            handleChangeDirection('Backwards');
          }}
          onPointerUp={() => handleChangeDirection('None')}
          onPointerLeave={() => handleChangeDirection('None')}
        >
          <ArrowDown />
        </StyledControlButton>
      </EdgeRow>
    </DirectionControlPanelWrapper>
  );
};

export default DirectionControlPanel;

