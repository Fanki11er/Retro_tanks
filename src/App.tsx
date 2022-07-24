import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import { theme } from "./GlobalStyles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
