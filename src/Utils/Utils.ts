import { Bullet } from '../Classes/Bullet/Bullet';
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
    const collisions: StaticDrawable[] = [];
    if (direction === 'Forwards') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (xPos + 0.2 < collisionZone.B.x && xPos + width - 0.2 > collisionZone.A.x && yPos >= collisionZone.A.y && yPos <= collisionZone.D.y) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }

    if (direction === 'Backwards') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          xPos + 0.2 < collisionZone.B.x &&
          xPos + width - 0.2 > collisionZone.A.x &&
          yPos + height >= collisionZone.A.y &&
          yPos + height <= collisionZone.D.y
        ) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }

    if (direction === 'Left') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (yPos + 0.2 < collisionZone.D.y && yPos + height - 0.2 > collisionZone.A.y && xPos <= collisionZone.D.x && xPos >= collisionZone.A.x) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }

    if (direction === 'Right') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          yPos + 0.2 < collisionZone.D.y &&
          yPos + height - 0.2 > collisionZone.A.y &&
          xPos + width >= collisionZone.A.x &&
          xPos + width <= collisionZone.B.x
        ) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }
    return collisions;
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
        return true;
      }
    }
    if (direction === 'Backwards') {
      if (yPos + height >= boardHeight) {
        return true;
      }
    }
    if (direction === 'Left') {
      if (xPos <= 0) {
        return true;
      }
    }
    if (direction === 'Right') {
      if (xPos + width >= boardWidth) {
        return true;
      }
    }
    return false;
  }

  static findHitElementIndex(id: string, staticObjects: StaticDrawable[]) {
    return staticObjects.findIndex((element) => {
      return element.id === id;
    });
  }

  static removeDestroyedElement<T extends StaticDrawable | Bullet>(array: Array<T>, id: string) {
    const elementIndex = array.findIndex((element) => {
      return element.id! === id;
    });
    if (elementIndex >= 0) {
      array.splice(elementIndex, 1);
    }
  }
}

