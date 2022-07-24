import styled from "styled-components";
import { StyledTheme } from "../../../GlobalStyles/theme";

export const DirectionControlPanelWrapper = styled.section`
  width: 100%;
  height: 150px;
  background-color: ${(props: StyledTheme) => props.theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MiddleRow = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const EdgeRow = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
