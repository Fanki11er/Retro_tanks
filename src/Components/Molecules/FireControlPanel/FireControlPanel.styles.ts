import styled from "styled-components";

export const FireControlPanelWrapper = styled.section`
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/3;
  grid-row: 2/3;
  justify-self: flex-start;

  @media screen and (${({ theme }) => theme.devices.small}) {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  @media screen and (${({ theme }) => theme.devices.medium}) {
    display: none;
  }
`;
