import { createContext } from "react";
import type { Direction } from "../Types/Types";
import { levels } from "../Levels/Levels";
import { Game } from "../Classes/Game/Game";

export const GameContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChangeDirection: (_direction: Direction) => {},
  handleShot: () => {},
  game: new Game(1, levels),
});
