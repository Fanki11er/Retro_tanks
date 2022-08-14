import styled from 'styled-components';
import { StyledTheme } from '../../../GlobalStyles/theme';

export const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px 312px 40px;
  grid-template-rows: 4px 312px 4px;
  background-color: black;
  grid-column: 2/4;
  grid-row: 1/2;
  justify-self: center;
  transform: scale(0.85);

  @media screen and (${(props: StyledTheme) => props.theme.devices.small}) {
    transform: scale(1);
    grid-column: 2/3;
    grid-row: 1/2;
  }
  @media screen and (${(props: StyledTheme) => props.theme.devices.medium}) {
    transform: scale(2);
    grid-column: 1/2;
    grid-row: 1/2;
  }
`;

