import { CollisionZone, Coordinates } from '../../Types/Types';

export class BulletHitZone {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;

  constructor(startCoordinates: Coordinates, translateX: number, translateY: number, resizeWidth: number, resizeHeight: number) {
    this.A = new Coordinates(startCoordinates.x - resizeWidth / 2 + translateX, startCoordinates.y - resizeHeight / 2 + translateY);
    this.B = new Coordinates(startCoordinates.x + resizeWidth / 2 + translateX, this.A.y + translateY);
    this.C = new Coordinates(this.A.x, startCoordinates.y + resizeHeight / 2 + translateY);
    this.D = new Coordinates(startCoordinates.x + resizeWidth / 2 + translateX, startCoordinates.y + resizeHeight / 2 + translateY);
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

