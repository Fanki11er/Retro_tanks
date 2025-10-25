import styled from "styled-components";

export const StyledControlButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;
