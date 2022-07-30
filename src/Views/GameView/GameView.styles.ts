import styled from 'styled-components';
import { StyledTheme } from '../../GlobalStyles/theme';

export const GameViewWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: grid;
  grid-template-columns: 1fr 380px 180px;
  justify-content: center;
  align-items: center;
`;

