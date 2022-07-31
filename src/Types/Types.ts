import { Coordinates } from '../Classes/BrickWall/BrickWall';

export type Direction = 'Forwards' | 'Left' | 'Right' | 'Backwards' | 'None';

export type BoardElementType = 'Full' | 'Horizontally' | 'Vertically';

export type CollisionZone = {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;
};

export interface StaticDrawable {
  draw: (ctx: CanvasRenderingContext2D) => void;
  getCollisionZone: () => CollisionZone;
}

