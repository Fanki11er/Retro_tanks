import styled from "styled-components";
import { StyledTheme } from "../../../GlobalStyles/theme";

export const RightGamePanelWrapper = styled.div`
  width: 40px;
  height: 320px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkerGray};
  grid-column: 3 /4;
  grid-row: 1 /3;
`;
