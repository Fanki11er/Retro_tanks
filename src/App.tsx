import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles/GlobalStyle';
import { theme } from './GlobalStyles/theme';
import GameView from './Views/GameView/GameView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameView />
    </ThemeProvider>
  );
}

export default App;

