import styled from "styled-components";

export const StyledCanvas = styled.canvas`
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: black;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  //border-left: 20px solid ${({ theme }) => theme.colors.darkerGray};
  //border-top: 4px solid ${({ theme }) => theme.colors.darkerGray};
  //border-bottom: 4px solid ${({ theme }) => theme.colors.darkerGray};
`;
