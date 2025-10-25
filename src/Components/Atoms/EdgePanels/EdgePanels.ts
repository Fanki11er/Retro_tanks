import styled from "styled-components";

const EdgePanel = styled.div`
  background-color: ${({ theme }) => theme.colors.darkerGray};
`;

export const TopEdgePanel = styled(EdgePanel)`
  width: 312px;
  height: 4px;
  grid-column: 2/3;
  grid-row: 1/2;
`;

export const BottomEdgePanel = styled(EdgePanel)`
  width: 312px;
  height: 4px;
  grid-column: 2/3;
  grid-row: 3/4;
`;

export const LeftEdgePanel = styled(EdgePanel)`
  width: 20px;
  height: 320px;
  grid-column: 1/2;
  grid-row: 1/3;
`;
