import { CollisionZone } from '../../Types/Types';
import { Coordinates } from '../BrickWall/BrickWall';

export class BulletHitZone {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;

  constructor(startCoordinates: Coordinates, width: number, height: number, resizeWidth: number, resizeHeight: number) {
    this.A = new Coordinates(startCoordinates.x - resizeWidth / 2, startCoordinates.y - resizeHeight / 2);
    this.B = new Coordinates(startCoordinates.x + resizeWidth / 2, this.A.y);
    this.C = new Coordinates(this.A.x, startCoordinates.y + resizeHeight / 2);
    this.D = new Coordinates(startCoordinates.x + resizeWidth / 2, startCoordinates.y + resizeHeight / 2);
    //console.log(startCoordinates);
    //console.log(this.A);
    //console.log(this.B);
    //console.log(this.C);
    //console.log(this.D);
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

