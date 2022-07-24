import styled from "styled-components";
import { StyledTheme } from "../../../GlobalStyles/theme";

export const FireControlPanelWrapper = styled.section`
  width: 100%;
  height: 120px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;
