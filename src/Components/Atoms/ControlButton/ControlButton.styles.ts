import styled from "styled-components";
import { StyledTheme } from "../../../GlobalStyles/theme";

export const StyledControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props: StyledTheme) => props.theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;
