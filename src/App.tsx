import { ThemeProvider } from "styled-components";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "./Components/Atoms/Arrow/Arrow";

import { StyledControlButton } from "./Components/Atoms/ControlButton/ControlButton.styles";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import { theme } from "./GlobalStyles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledControlButton>
        <ArrowUp />
      </StyledControlButton>
      <StyledControlButton>
        <ArrowDown />
      </StyledControlButton>
      <StyledControlButton>
        <ArrowLeft />
      </StyledControlButton>
      <StyledControlButton>
        <ArrowRight />
      </StyledControlButton>
    </ThemeProvider>
  );
}

export default App;
