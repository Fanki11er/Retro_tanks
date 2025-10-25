import "./App.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles/theme";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import GameView from "./Views/GameView/GameView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameView />
    </ThemeProvider>
  );
}

export default App;
