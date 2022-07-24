import { ThemeProvider } from "styled-components";
import DirectionControlPanel from "./Components/Molecules/DirectionControlPanel/DirectionControlPanel";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import { theme } from "./GlobalStyles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DirectionControlPanel />
    </ThemeProvider>
  );
}

export default App;
