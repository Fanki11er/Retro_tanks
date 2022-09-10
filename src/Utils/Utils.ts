import { Bullet } from '../Classes/Bullet/Bullet';
import { BoardElementType, CollisionZone, Direction, MaterialType, StaticDrawable, StaticObjectsRecipe, WallCoordinates } from '../Types/Types';

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
        if (xPos + 0.5 < collisionZone.B.x && xPos + width - 0.5 > collisionZone.A.x && yPos >= collisionZone.A.y && yPos <= collisionZone.D.y) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }

    if (direction === 'Backwards') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          xPos + 0.5 < collisionZone.B.x &&
          xPos + width - 0.5 > collisionZone.A.x &&
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
        if (yPos + 0.5 < collisionZone.D.y && yPos + height - 0.5 > collisionZone.A.y && xPos <= collisionZone.D.x && xPos >= collisionZone.A.x) {
          collisions.push(staticObjects[i]);
        }
      }
      return collisions;
    }

    if (direction === 'Right') {
      for (let i = 0; i < staticObjects.length; i++) {
        const collisionZone = staticObjects[i].getCollisionZone();
        if (
          yPos + 0.5 < collisionZone.D.y &&
          yPos + height - 0.5 > collisionZone.A.y &&
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
      if (yPos <= 4) {
        return true;
      }
    }
    if (direction === 'Backwards') {
      if (yPos + height >= boardHeight - 4) {
        return true;
      }
    }
    if (direction === 'Left') {
      if (xPos <= 20) {
        return true;
      }
    }
    if (direction === 'Right') {
      if (xPos + width >= boardWidth - 40) {
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

  /*static getPrecisionCollisionPlace(collisionZone: CollisionZone, direction: Direction, coordinates: WallCoordinates[], textureSize: number) {
    if (direction === 'Forwards') {
      for (let i = 0; i < coordinates.length; i++) {
        if (
          coordinates[i] &&
          coordinates[i]!.x + 0.2 < collisionZone.B.x &&
          coordinates[i]!.x + textureSize - 0.2 > collisionZone.A.x &&
          coordinates[i]!.y <= collisionZone.C.y &&
          coordinates[i]!.y + textureSize >= collisionZone.A.y
        ) {
          return { x: collisionZone.A.x, y: collisionZone.A.y };
        }
      }
    }
    if (direction === 'Backwards') {
      for (let i = 0; coordinates.length; i++) {
        if (
          coordinates[i] &&
          coordinates[i]!.x + 0.2 < collisionZone.B.x &&
          coordinates[i]!.x + textureSize - 0.2 > collisionZone.A.x &&
          coordinates[i]!.y <= collisionZone.C.y &&
          coordinates[i]!.y + textureSize >= collisionZone.A.y
        ) {
          return { x: collisionZone.C.x, y: collisionZone.C.y };
        }
      }
    }
    if (direction === 'Left') {
      for (let i = 0; coordinates.length; i++) {
        if (
          coordinates[i] &&
          coordinates[i]!.x <= collisionZone.B.x &&
          coordinates[i]!.x + textureSize >= collisionZone.A.x &&
          coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          coordinates[i]!.y + textureSize - 0.2 > collisionZone.A.y
        ) {
          return { x: collisionZone.A.x, y: collisionZone.A.y };
        }
      }
    }
    if (direction === 'Right') {
      for (let i = 0; i < coordinates.length; i++) {
        if (
          coordinates[i] &&
          coordinates[i]!.x <= collisionZone.B.x &&
          coordinates[i]!.x + textureSize >= collisionZone.A.x &&
          coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          coordinates[i]!.y + textureSize - 0.2 > collisionZone.A.y
        ) {
          return { x: collisionZone.B.x, y: collisionZone.B.y };
        }
      }
    }
    return null;
  }*/

  static getPrecisionHitPlace(collisionZone: CollisionZone, direction: Direction, coordinates: WallCoordinates[], textureSize: number) {
    for (let i = 0; i < coordinates.length; i++) {
      if (
        coordinates[i] &&
        coordinates[i]!.x <= collisionZone.B.x &&
        coordinates[i]!.x + textureSize >= collisionZone.A.x &&
        coordinates[i]!.y <= collisionZone.C.y &&
        coordinates[i]!.y + textureSize >= collisionZone.A.y
      ) {
        if (direction === 'Forwards') {
          return { x: collisionZone.A.x + 1, y: collisionZone.A.y };
        }
        if (direction === 'Backwards') {
          return { x: collisionZone.C.x + 1, y: collisionZone.C.y };
        }

        if (direction === 'Left') {
          return { x: collisionZone.A.x, y: collisionZone.A.y + 1 };
        }
        if (direction === 'Right') {
          return { x: collisionZone.B.x, y: collisionZone.B.y + 1 };
        }
      }
    }
    return null;
  }

  static makeStaticObjectRecipe(
    material: MaterialType,
    xPos: number,
    yPos: number,
    layoutType: BoardElementType,
    eagleBorder: boolean = false,
  ): StaticObjectsRecipe {
    return {
      material,
      xPos,
      yPos,
      layoutType,
      eagleBorder,
    };
  }
}

