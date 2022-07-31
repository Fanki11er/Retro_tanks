import { CollisionZone } from '../../Types/Types';
import { Coordinates } from '../BrickWall/BrickWall';

export class ElementCollisionZone {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;

  constructor(startCoordinates: Coordinates, width: number, height: number) {
    this.A = startCoordinates;
    this.B = new Coordinates(this.A.x + width, this.A.y);
    this.C = new Coordinates(this.A.x, this.A.y + height);
    this.D = new Coordinates(this.A.x + width, this.A.y + height);
  }

  getCollisionZone() {
    return {
      A: this.A,
      B: this.B,
      C: this.C,
      D: this.D,
    } as CollisionZone;
  }
}

