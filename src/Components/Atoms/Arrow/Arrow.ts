import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";

export const ArrowUp = styled(Arrow)`
  transform-origin: center;
`;
export const ArrowDown = styled(ArrowUp)`
  transform: rotate(180deg);
`;
export const ArrowLeft = styled(ArrowUp)`
  transform: rotate(-90deg);
`;
export const ArrowRight = styled(ArrowUp)`
  transform: rotate(90deg);
`;
