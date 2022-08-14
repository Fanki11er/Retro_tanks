import styled from 'styled-components';
import { StyledTheme } from '../../GlobalStyles/theme';

export const GameViewWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: grid;
  grid-template-columns: 1fr 100px 220px 1fr;
  grid-template-rows: 320px 200px;
  justify-content: center;
  align-items: center;

  @media screen and (${(props: StyledTheme) => props.theme.devices.small}) {
    grid-template-columns: 100px 380px 1fr;
  }

  @media screen and (${(props: StyledTheme) => props.theme.devices.medium}) {
    grid-template-columns: 1fr;
    grid-template-rows: initial;
  }

  /*@media screen and (${(props: StyledTheme) => props.theme.devices.medium}) and (hover: 'hover') {
    background-color: blue;
  }*/
`;

