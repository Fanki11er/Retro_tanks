import styled from "styled-components";
import { StyledTheme } from "../../../GlobalStyles/theme";

export const DirectionControlPanelWrapper = styled.section`
  width: 120px;
  height: 120px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: grid;
`;

export const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const EdgeRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
