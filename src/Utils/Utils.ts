import { Direction, StaticDrawable } from '../Types/Types';

export class Utils {
  static checkForCollisionWithObjects(
    direction: Direction,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    staticObjects: StaticDrawable[],
  ) {
    if (direction === 'Forwards') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (xPos < collisionZone.B.x && xPos + width > collisionZone.A.x && yPos - 0.2 > collisionZone.A.y && yPos - 0.2 < collisionZone.D.y) {
          return staticObjects[i].id;
        }
      }
    }

    if (direction === 'Backwards') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          xPos < collisionZone.B.x &&
          xPos + width > collisionZone.A.x &&
          yPos + height + 0.2 > collisionZone.A.y &&
          yPos + height + 0.2 < collisionZone.D.y
        ) {
          return staticObjects[i].id;
        }
      }
    }

    if (direction === 'Left') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (yPos < collisionZone.D.y && yPos + height > collisionZone.A.y && xPos - 0.2 < collisionZone.D.x && xPos - 0.2 > collisionZone.A.x) {
          return staticObjects[i].id;
        }
      }
    }

    if (direction === 'Right') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          yPos < collisionZone.D.y &&
          yPos + height > collisionZone.A.y &&
          xPos + width + 0.2 > collisionZone.A.x &&
          xPos + width + 0.2 < collisionZone.B.x
        ) {
          return staticObjects[i].id;
        }
      }
    }
    return '';
  }

  static checkForCollisionWithBorders(
    direction: Direction,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    boardWidth: number,
    boardHeight: number,
  ) {
    if (direction === 'Forwards') {
      if (yPos <= 0) {
        return 'border';
      }
    }
    if (direction === 'Backwards') {
      if (yPos + height >= boardHeight) {
        return 'border';
      }
    }
    if (direction === 'Left') {
      if (xPos <= 0) {
        return 'border';
      }
    }
    if (direction === 'Right') {
      if (xPos + width >= boardWidth) {
        return 'border';
      }
    }
    return '';
  }
}

