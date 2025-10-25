import styled from "styled-components";

export const GameViewWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  display: grid;
  grid-template-columns: 1fr 100px 220px 1fr;
  grid-template-rows: 320px 200px;
  justify-content: center;
  align-items: center;

  @media screen and (${({ theme }) => theme.devices.small}) {
    grid-template-columns: 100px 380px 1fr;
  }

  @media screen and (${({ theme }) => theme.devices.medium}) {
    grid-template-columns: 1fr;
    grid-template-rows: initial;
  }

  /*@media screen and (${({ theme }) =>
    theme.devices.medium}) and (hover: 'hover') {
    background-color: blue;
  }*/
`;
