import styled from 'styled-components';
import { StyledTheme } from '../../../GlobalStyles/theme';

export const FireControlPanelWrapper = styled.section`
  width: 100%;
  height: 120px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/3;
  grid-row: 2/3;
  justify-self: flex-start;

  @media screen and (${(props: StyledTheme) => props.theme.devices.small}) {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  @media screen and (${(props: StyledTheme) => props.theme.devices.medium}) {
    display: none;
  }
`;

