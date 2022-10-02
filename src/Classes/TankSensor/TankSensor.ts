import { Coordinates, Direction, SensorDirection, SensorReding, StaticDrawable } from '../../Types/Types';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { Game } from '../Game/Game';
import { Tank } from '../Tank/Tank';

abstract class TankSensor {
  A!: Coordinates;
  width!: number;
  height!: number;
  isCollision: boolean = false;

  constructor(protected tank: EnemyTank, protected game: Game, protected range: number) {
    this.updateCoordinates();
  }

  update() {
    this.updateCoordinates();
    this.tank.setIsBlockedBy(false);
    this.isCollision = false;

    this.intelligentCheckForCollisionWithBorders(372, 320);
    this.intelligentHandleCollisionWithStaticObjects();
    this.intelligentHandleCollisionsWithOtherTanks(this.game.enemyTanks);
    this.intelligentHandleCollisionsWithOtherTanks(this.game.players.getActivePlayersTanks());

    this.tank.setIsBlockedBy(this.tank.brain.checkForBlockade(this.tank.controls.direction));
  }

  protected abstract updateCoordinates(): void;
  protected abstract convertDirectionToSensorDirection(direction: Direction): SensorReding;

  protected intelligentCheckForCollisionWithBorders(boardWidth: number, boardHeight: number) {
    const { x, y } = this.A;
    const brain = this.tank.brain;

    if (y <= 4) {
      brain.updateValue('forwardReading', 0);
      this.isCollision = true;
    }

    if (y + this.height >= boardHeight - 4) {
      brain.updateValue('backwardReading', 0);
      this.isCollision = true;
    }

    if (x <= 20) {
      brain.updateValue('leftReading', 0);
      this.isCollision = true;
    }

    if (x + this.width >= boardWidth - 40) {
      brain.updateValue('rightReading', 0);
      this.isCollision = true;
    }
  }

  protected intelligentHandleCollisionWithStaticObjects() {
    let collision = false;
    if (!this.tank.getIsBlocked()) {
      //const { x, y } = this.A;
      /*const collisionWith = this.intelligentCheckForCollisionWithObjects(
        this.tank.controls.direction,
        x,
        y,
        this.width,
        this.height,
        this.game.staticObjects,
      );*/

      const collisionWith = this.intelligentCheckForCollisionWithObjects();
      if (collisionWith.length) {
        for (let i = 0; i < collisionWith.length; i++) {
          if (/*!this.tank.getIsBlocked() &&*/ !collision) {
            collision = !!collisionWith[i].getPrecisionCollisionPlace(
              new ElementCollisionZone(this.A, this.width, this.height),
              this.tank.controls.direction,
            );
            if (collision) {
              const direction = this.convertDirection(this.tank.controls.direction);
              this.tank.brain.updateValue(
                this.convertDirectionToSensorDirection(this.tank.controls.direction),
                this.figureMaterialType(collisionWith[i], direction),
              );
              this.isCollision = true;
            }
          }
        }
      }
    }
  }

  protected intelligentCheckForCollisionWithObjects() {
    const collisions: StaticDrawable[] = [];
    for (let i = 0; i < this.game.staticObjects.length; i++) {
      const collisionZone = this.game.staticObjects[i].getCollisionZone();
      if (
        this.A.x < collisionZone.B.x &&
        this.A.x + this.width > collisionZone.A.x &&
        this.A.y < collisionZone.C.y &&
        this.A.y + this.height > collisionZone.A.y
      ) {
        collisions.push(this.game.staticObjects[i]);
      }
    }
    return collisions;
  }

  protected figureMaterialType(object: StaticDrawable, direction: SensorDirection) {
    if (object.getMaterialType() === 'Brick') {
      return 0.5;
    } else if (object.getMaterialType() === 'Concrete') {
      return 0;
    }
    return 0;
  }

  protected convertDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        return 'forward';
      }
      case 'Backwards': {
        return 'backward';
      }
      case 'Left': {
        return 'left';
      }
      case 'Right': {
        return 'right';
      }
      default: {
        return 'forward';
      }
    }
  }

  protected intelligentDetectCollisionsWithOtherTanks(tanks: Tank[]) {
    for (let i = 0; i < tanks.length; i++) {
      if (tanks[i].getId() === this.tank.getId()) {
        continue;
      }
      const { width, height } = tanks[i].getSize();
      const coordinates = tanks[i].getCoordinates();
      const collisionZone = new ElementCollisionZone(coordinates, width, height);

      if (
        this.A.x < collisionZone.B.x &&
        this.A.x + this.width > collisionZone.A.x &&
        this.A.y < collisionZone.C.y &&
        this.A.y + this.height > collisionZone.A.y
      ) {
        return true;
      }
    }

    return false;
  }

  protected intelligentHandleCollisionsWithOtherTanks(tanks: Tank[]) {
    if (this.intelligentDetectCollisionsWithOtherTanks(tanks)) {
      this.tank.brain.updateValue(this.convertDirectionToSensorDirection(this.tank.controls.direction), 0);
      this.isCollision = true;
    }
  }
}

export class FrontTankSensor extends TankSensor {
  constructor(protected tank: EnemyTank, protected game: Game, protected range: number) {
    super(tank, game, range);
  }

  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();

    this.A = new Coordinates(startCoordinates.x, startCoordinates.y);
    this.width = width;
    this.height = height;
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        return 'forwardReading';
      }
      case 'Backwards': {
        return 'backwardReading';
      }
      case 'Left': {
        return 'leftReading';
      }
      case 'Right': {
        return 'rightReading';
      }
      default: {
        return 'forwardReading';
      }
    }
  }
}
export class LeftTankSensor extends TankSensor {
  constructor(protected tank: EnemyTank, protected game: Game, protected range: number) {
    super(tank, game, range);
  }

  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === 'Forwards' || direction === 'Backwards') {
      this.A = new Coordinates(startCoordinates.x - this.range, startCoordinates.y);
      this.width = this.range;
      this.height = height - 1;
    } else if (direction === 'Left' || direction === 'Right') {
      this.A = new Coordinates(startCoordinates.x, startCoordinates.y + height);
      this.width = width - 1;
      this.height = this.range;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        return 'leftReading';
      }
      case 'Backwards': {
        return 'leftReading';
      }
      case 'Left': {
        return 'backwardReading';
      }
      case 'Right': {
        return 'backwardReading';
      }
      default: {
        return 'forwardReading';
      }
    }
  }
}

export class RightTankSensor extends TankSensor {
  constructor(protected tank: EnemyTank, protected game: Game, protected range: number) {
    super(tank, game, range);
  }

  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === 'Forwards' || direction === 'Backwards') {
      this.A = new Coordinates(startCoordinates.x + width, startCoordinates.y);
      this.width = this.range;
      this.height = height - 1;
    } else if (direction === 'Left' || direction === 'Right') {
      this.A = new Coordinates(startCoordinates.x, startCoordinates.y - this.range);
      this.width = width - 1;
      this.height = this.range;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        return 'rightReading';
      }
      case 'Backwards': {
        return 'rightReading';
      }
      case 'Left': {
        return 'forwardReading';
      }
      case 'Right': {
        return 'forwardReading';
      }
      default: {
        return 'forwardReading';
      }
    }
  }
}

export class RearTankSensor extends TankSensor {
  constructor(protected tank: EnemyTank, protected game: Game, protected range: number) {
    super(tank, game, range);
  }

  updateCoordinates() {
    const { width, height } = this.tank.getSize();
    const startCoordinates = this.tank.getCoordinates();
    const direction = this.tank.controls.direction;

    if (direction === 'Forwards') {
      this.A = new Coordinates(startCoordinates.x + 1, startCoordinates.y + height);
      this.width = width - 1;
      this.height = this.range;
    } else if (direction === 'Backwards') {
      this.A = new Coordinates(startCoordinates.x + 1, startCoordinates.y - this.range);
      this.width = width - 1;
      this.height = this.range;
    } else if (direction === 'Left') {
      this.A = new Coordinates(startCoordinates.x + width, startCoordinates.y + 1);
      this.width = this.range;
      this.height = height - 1;
    } else if (direction === 'Right') {
      this.A = new Coordinates(startCoordinates.x - this.range, startCoordinates.y + 1);
      this.width = this.range;
      this.height = height - 1;
    }
  }

  protected convertDirectionToSensorDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        return 'backwardReading';
      }
      case 'Backwards': {
        return 'forwardReading';
      }
      case 'Left': {
        return 'rightReading';
      }
      case 'Right': {
        return 'leftReading';
      }
      default: {
        return 'forwardReading';
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
