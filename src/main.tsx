import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle.ts";
import GameView from "./Views/GameView/GameView.tsx";
import { theme } from "./GlobalStyles/theme.ts";
import { ThemeProvider } from "styled-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameView />
    </ThemeProvider>
  </StrictMode>,
);
