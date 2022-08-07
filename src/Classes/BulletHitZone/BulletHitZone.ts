import { CollisionZone } from '../../Types/Types';
import { Coordinates } from '../BrickWall/BrickWall';

export class BulletHitZone {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;

  constructor(startCoordinates: Coordinates, width: number, height: number, resizeWidth: number, resizeHeight: number) {
    this.A = new Coordinates(startCoordinates.x - resizeWidth / 2, startCoordinates.y - resizeHeight / 2);
    this.B = new Coordinates(this.A.x + width / 2 + resizeWidth, this.A.y);
    this.C = new Coordinates(this.A.x, this.A.y + height / 2 + resizeHeight);
    this.D = new Coordinates(this.A.x + width / 2 + resizeWidth, this.A.y + height / 2 + resizeHeight);
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

