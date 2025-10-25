import styled from "styled-components";

export const RightGamePanelWrapper = styled.div`
  width: 40px;
  height: 320px;
  background-color: ${({ theme }) => theme.colors.darkerGray};
  grid-column: 3 /4;
  grid-row: 1 /3;
`;
