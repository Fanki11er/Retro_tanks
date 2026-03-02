import { Coordinates } from "../../Types/Types";
import type {
  Direction,
  /*SensorDirection,*/ SensorReding,
  StaticDrawable,
} from "../../Types/Types";
import { ElementCollisionZone } from "../ElementCollisionZone/ElementCollisionZone";
import { EnemyTank } from "../EnemyTank/EnemyTank";
import { Game } from "../Game/Game";
import { Tank } from "../Tank/Tank";

abstract class TankSensor {
  A!: Coordinates;
  width!: number;
  height!: number;
  isCollision: boolean = false;
  public tank: EnemyTank;
  public game: Game;
  protected range: number;

  constructor(tank: EnemyTank, game: Game, range: number) {
    this.tank = tank;
    this.game = game;
    this.range = range;
    this.updateCoordinates();
  }

  update() {
    this.updateCoordinates();
    this.isCollision = false;
    this.handleCollisions();
    //this.intelligentCheckForCollisionWithBorders(372, 320);
    //this.intelligentHandleCollisionWithStaticObjects();
    //this.intelligentHandleCollisionsWithOtherTanks(this.game.enemyTanks);
    //this.intelligentHandleCollisionsWithOtherTanks(
    //this.game.players.getActivePlayersTanks(),
    //);

    this.tank.setIsBlockedBy(false);
    this.tank.setIsBlockedBy(
      this.tank.brain.checkForBlockade(this.tank.controls.direction),
    );
  }

  protected abstract updateCoordinates(): void;
  protected abstract convertDirectionToSensorDirection(
    direction: Direction,
  ): SensorReding;
  protected abstract handleCollisions(): void;

  protected intelligentCheckForCollisionWithBorders(
    boardWidth: number,
    boardHeight: number,
  ) {
    const { x, y } = this.A;
    const brain = this.tank.brain;

    if (y <= 4) {
      brain.updateValue("forwardReading", 1);
      this.isCollision = true;
      this.tank.setIsBlockedBy(true);
    }

    if (y + this.height >= boardHeight - 4) {
      brain.updateValue("backwardReading", 1);
      this.isCollision = true;
    }

    if (x <= 20) {
      brain.updateValue("leftReading", 1);
      this.isCollision = true;
    }

    if (x + this.width >= boardWidth - 40) {
      brain.updateValue("rightReading", 1);
      this.isCollision = true;
    }
  }

  protected intelligentHandleCollisionWithStaticObjects(
    callback: (sensor: TankSensor) => StaticDrawable[],
  ) {
    //console.log("Handling collisions with static objects");
    let collision = false;
    // if (!this.tank.getIsBlocked()) {
    //const { x, y } = this.A;
    /*const collisionWith = this.intelligentCheckForCollisionWithObjects(
        this.tank.controls.direction,
        x,
        y,
        this.width,
        this.height,
        this.game.staticObjects,
      );*/

    //const collisionWith = this.intelligentCheckForCollisionWithObjects();
    const collisionWith = callback(this);
    if (collisionWith.length) {
      for (let i = 0; i < collisionWith.length; i++) {
        if (!this.tank.getIsBlocked() && !collision) {
          collision = !!collisionWith[i].getPrecisionCollisionPlace(
            new ElementCollisionZone(this.A, this.width, this.height),
            this.tank.controls.direction,
          );
          if (collision) {
            //const direction = this.convertDirection(this.tank.controls.direction);
            this.tank.brain.updateValue(
              this.convertDirectionToSensorDirection(
                this.tank.controls.direction,
              ),
              1,
            );
            this.isCollision = true;
          }
        }
      }
    }
    //}
  }

  protected intelligentDetectCollisionsWithOtherTanks(
    sensor: TankSensor,
    tanks: Tank[],
  ) {
    const { tank } = sensor;
    const tankId = tank.getId();
    for (let i = 0; i < tanks.length; i++) {
      if (tanks[i].getId() === tankId) {
        continue;
      }
      // const { width, height } = tanks[i].getSize();
      // const coordinates = tanks[i].getCoordinates();
      const collisionZone = tanks[i].getCollisionZone();
      // const collisionZone = new ElementCollisionZone(
      //   coordinates,
      //   width,
      //   height,
      // );

      if (
        sensor.A.x < collisionZone.B.x &&
        sensor.A.x + sensor.width > collisionZone.A.x &&
        sensor.A.y < collisionZone.C.y &&
        sensor.A.y + sensor.height > collisionZone.A.y
      ) {
        return true;
      }
    }

    return false;
  }

  // protected figureMaterialType(
  //   object: StaticDrawable /*direction: SensorDirection*/,
  // ) {
  //   if (object.getMaterialType() === "Brick") {
  //     return 1;
  //   } else if (object.getMaterialType() === "Concrete") {
  //     return 1;
  //   }
  //   return 0;
  // }

  protected convertDirection(direction: Direction) {
    switch (direction) {
      case "Forwards": {
        return "forward";
      }
      case "Backwards": {
        return "backward";
      }
      case "Left": {
        return "left";
      }
      case "Right": {
        return "right";
      }
      default: {
        return "forward";
      }
    }
  }

  protected intelligentHandleCollisionsWithOtherTanks(
    tanks: Tank[],
    callback: (sensor: TankSensor, tanks: Tank[]) => boolean,
  ) {
    //!callback

    if (
      // this.intelligentDetectCollisionsWithOtherTanks(
      //   tanks,
      //   this.tank.controls.direction,
      // )

      callback(this, tanks)
    ) {
      this.tank.brain.updateValue(
        this.convertDirectionToSensorDirection(this.tank.controls.direction),
        1,
      );
      this.isCollision = true;
    }
  }
}

export abstract class SideSensor extends TankSensor {
  protected handleCollisions() {
    this.intelligentCheckForCollisionWithBorders(372, 320);
    this.intelligentHandleCollisionWithStaticObjects(
      this.intelligentCheckForCollisionWithObjects,
    );
    this.intelligentHandleCollisionsWithOtherTanks(
      this.game.players.getActivePlayersTanks(),
      this.intelligentDetectCollisionsWithOtherTanks,
    );
    this.intelligentHandleCollisionsWithOtherTanks(
      this.game.enemyTanks,
      this.intelligentDetectCollisionsWithOtherTanks,
    );
  }

  protected intelligentCheckForCollisionWithObjects(sensor: TankSensor) {
    const collisions: StaticDrawable[] = [];
    const { A, width, height, game } = sensor;
    for (let i = 0; i < game.staticObjects.length; i++) {
      const collisionZone = game.staticObjects[i].getCollisionZone();
      if (
        A.x < collisionZone.B.x &&
        A.x + width > collisionZone.A.x &&
        A.y < collisionZone.C.y &&
        A.y + height > collisionZone.A.y
      ) {
        collisions.push(game.staticObjects[i]);
      }
    }
    return collisions;
  }
}

export abstract class MainSensor extends TankSensor {
  protected handleCollisions() {
    this.intelligentCheckForCollisionWithBorders(372, 320);
    this.intelligentHandleCollisionWithStaticObjects(
      this.intelligentCheckForCollisionWithObjects,
    );
    this.intelligentHandleCollisionsWithOtherTanks(
      this.game.players.getActivePlayersTanks(),
      this.intelligentDetectCollisionsWithOtherTanks,
    );
    this.intelligentHandleCollisionsWithOtherTanks(
      this.game.enemyTanks,
      this.intelligentDetectCollisionsWithOtherTanks,
    );
  }

  protected intelligentCheckForCollisionWithObjects(sensor: TankSensor) {
    const collisions: StaticDrawable[] = [];
    const { tank, game } = sensor;
    const direction = tank.controls.direction;
    const { x: xPos, y: yPos } = tank.getCoordinates();
    const { width, height } = tank.getSize();
    const staticObjects = game.staticObjects;

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (
        xPos < collisionZone.B.x &&
        xPos + width > collisionZone.A.x &&
        yPos >= collisionZone.A.y &&
        yPos <= collisionZone.D.y
      ) {
        if (direction === "Forwards") {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (
        xPos < collisionZone.B.x &&
        xPos + width > collisionZone.A.x &&
        yPos + height >= collisionZone.A.y &&
        yPos + height <= collisionZone.D.y
      ) {
        if (direction === "Backwards") {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (
        yPos < collisionZone.D.y &&
        yPos + height > collisionZone.A.y &&
        xPos <= collisionZone.D.x &&
        xPos >= collisionZone.A.x
      ) {
        if (direction === "Left") {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (
        yPos < collisionZone.D.y &&
        yPos + height > collisionZone.A.y &&
        xPos + width >= collisionZone.A.x &&
        xPos + width <= collisionZone.B.x
      ) {
        if (direction === "Right") {
          collisions.push(staticObjects[i]);
        }
      }
    }

    return collisions;
  }
}

export class FrontTankSensor extends MainSensor {
  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;
    if (direction === "Forwards") {
      this.A = new Coordinates(
        startCoordinates.x + 0.5,
        startCoordinates.y - 4,
      );
      this.width = width - 2.5;
      this.height = height;
    } else if (direction === "Backwards") {
      this.A = new Coordinates(
        startCoordinates.x + 0.5,
        startCoordinates.y + 2,
      );
      this.width = width - 2.5;
      this.height = height;
    } else if (direction === "Left") {
      this.A = new Coordinates(
        startCoordinates.x - 4,
        startCoordinates.y + 0.5,
      );
      this.width = width;
      this.height = height - 2.5;
    } else if (direction === "Right") {
      this.A = new Coordinates(
        startCoordinates.x + 2,
        startCoordinates.y + 0.5,
      );
      this.width = width;
      this.height = height - 2.5;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case "Forwards": {
        return "forwardReading";
      }
      case "Backwards": {
        return "backwardReading";
      }
      case "Left": {
        return "leftReading";
      }
      case "Right": {
        return "rightReading";
      }
      default: {
        return "forwardReading";
      }
    }
  }
}
export class LeftTankSensor extends SideSensor {
  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === "Forwards" || direction === "Backwards") {
      this.A = new Coordinates(
        startCoordinates.x - this.range + 1,
        startCoordinates.y + 0.5,
      );
      this.width = this.range;
      this.height = height - 2;
    } else if (direction === "Left" || direction === "Right") {
      this.A = new Coordinates(
        startCoordinates.x,
        startCoordinates.y + height - 1.5,
      );
      this.width = width;
      this.height = this.range;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case "Forwards": {
        return "leftReading";
      }
      case "Backwards": {
        return "leftReading";
      }
      case "Left": {
        return "backwardReading";
      }
      case "Right": {
        return "backwardReading";
      }
      default: {
        return "forwardReading";
      }
    }
  }
}

export class RightTankSensor extends SideSensor {
  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === "Forwards" || direction === "Backwards") {
      this.A = new Coordinates(
        startCoordinates.x + width - 2,
        startCoordinates.y,
      );
      this.width = this.range;
      this.height = height;
    } else if (direction === "Left" || direction === "Right") {
      this.A = new Coordinates(
        startCoordinates.x,
        startCoordinates.y - this.range,
      );
      this.width = width;
      this.height = this.range;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case "Forwards": {
        return "rightReading";
      }
      case "Backwards": {
        return "rightReading";
      }
      case "Left": {
        return "forwardReading";
      }
      case "Right": {
        return "forwardReading";
      }
      default: {
        return "forwardReading";
      }
    }
  }
}

export class RearTankSensor extends SideSensor {
  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === "Forwards") {
      this.A = new Coordinates(startCoordinates.x, startCoordinates.y + height);
      this.width = width - 2;
      this.height = this.range;
    } else if (direction === "Backwards") {
      this.A = new Coordinates(
        startCoordinates.x,
        startCoordinates.y - this.range,
      );
      this.width = width - 2;
      this.height = this.range;
    } else if (direction === "Left") {
      this.A = new Coordinates(startCoordinates.x + width, startCoordinates.y);
      this.width = this.range;
      this.height = height - 2;
    } else if (direction === "Right") {
      this.A = new Coordinates(
        startCoordinates.x - this.range,
        startCoordinates.y,
      );
      this.width = this.range;
      this.height = height - 2;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case "Forwards": {
        return "backwardReading";
      }
      case "Backwards": {
        return "forwardReading";
      }
      case "Left": {
        return "rightReading";
      }
      case "Right": {
        return "leftReading";
      }
      default: {
        return "forwardReading";
      }
    }
  }
}

/*protected intelligentDetectCollisionsWithOtherTanks(tanks: Tank[]) {
    for (let i = 0; i < tanks.length; i++) {
      if (tanks[i].getId() === this.tank.getId()) {
        continue;
      }
      const { width, height } = tanks[i].getSize();
      const coordinates = tanks[i].getCoordinates();
      const collisionZone = new ElementCollisionZone(coordinates, width, height);
      if (this.tank.controls.direction === 'Forwards') {
        if (
          this.A.x <= collisionZone.B.x &&
          this.A.x + this.width >= collisionZone.A.x &&
          this.A.y >= collisionZone.A.y &&
          this.A.y <= collisionZone.D.y
        ) {
          return true;
        }
      }
      if (this.tank.controls.direction === 'Backwards') {
        if (
          this.A.x <= collisionZone.B.x &&
          this.A.x + this.width >= collisionZone.A.x &&
          this.A.y + this.height >= collisionZone.A.y &&
          this.A.y + this.height <= collisionZone.D.y
        ) {
          return true;
        }
      }

      if (this.tank.controls.direction === 'Left') {
        if (
          this.A.y <= collisionZone.D.y &&
          this.A.y + this.height >= collisionZone.A.y &&
          this.A.x <= collisionZone.D.x &&
          this.A.x >= collisionZone.A.x
        ) {
          return true;
        }
      }
      if (this.tank.controls.direction === 'Right') {
        if (
          this.A.y <= collisionZone.D.y &&
          this.A.y + this.height > collisionZone.A.y &&
          this.A.x + this.width >= collisionZone.A.x &&
          this.A.x + this.width <= collisionZone.B.x
        ) {
          return true;
        }
      }
    }
    return false;
  }*/

/*protected intelligentCheckForCollisionWithObjects(
    direction: Direction,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    staticObjects: StaticDrawable[],
  ) {
    const collisions: StaticDrawable[] = [];

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (xPos < collisionZone.B.x && xPos + width > collisionZone.A.x && yPos >= collisionZone.A.y && yPos <= collisionZone.D.y) {
        if (direction === 'Forwards') {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (xPos < collisionZone.B.x && xPos + width > collisionZone.A.x && yPos + height >= collisionZone.A.y && yPos + height <= collisionZone.D.y) {
        if (direction === 'Backwards') {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (yPos < collisionZone.D.y && yPos + height > collisionZone.A.y && xPos <= collisionZone.D.x && xPos >= collisionZone.A.x) {
        if (direction === 'Left') {
          collisions.push(staticObjects[i]);
        }
      }
    }

    for (let i = 0; i < staticObjects.length; i++) {
      const collisionZone = staticObjects[i].getCollisionZone();
      if (yPos < collisionZone.D.y && yPos + height > collisionZone.A.y && xPos + width >= collisionZone.A.x && xPos + width <= collisionZone.B.x) {
        if (direction === 'Right') {
          collisions.push(staticObjects[i]);
        }
      }
    }

    return collisions;
  }*/
