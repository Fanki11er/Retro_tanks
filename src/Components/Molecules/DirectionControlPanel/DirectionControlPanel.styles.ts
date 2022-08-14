import styled from 'styled-components';
import { StyledTheme } from '../../../GlobalStyles/theme';

export const DirectionControlPanelWrapper = styled.section`
  width: 100%;
  height: 150px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 3/5;
  grid-row: 2/3;
  justify-self: flex-end;

  @media screen and (${(props: StyledTheme) => props.theme.devices.small}) {
    grid-column: 3/4;
    grid-row: 1/2;
  }

  @media screen and (${(props: StyledTheme) => props.theme.devices.medium}) {
    display: none;
  }
`;

export const MiddleRow = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const EdgeRow = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

