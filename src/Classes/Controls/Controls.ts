import { Direction } from '../../Types/Types';

export class Controls {
  forwards;
  left;
  right;
  backwards;
  lastDirection: Direction;
  constructor() {
    this.forwards = false;
    this.left = false;
    this.right = false;
    this.backwards = false;
    this.lastDirection = 'Forwards';
  }

  public setDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        this.forwards = true;
        this.left = false;
        this.right = false;
        this.backwards = false;
        this.lastDirection = 'Forwards';
        break;
      }
      case 'Left': {
        this.forwards = false;
        this.left = true;
        this.right = false;
        this.backwards = false;
        this.lastDirection = 'Left';
        break;
      }
      case 'Right': {
        this.forwards = false;
        this.left = false;
        this.right = true;
        this.backwards = false;
        this.lastDirection = 'Right';
        break;
      }
      case 'Backwards': {
        this.forwards = false;
        this.left = false;
        this.right = false;
        this.backwards = true;
        this.lastDirection = 'Backwards';

        break;
      }
      case 'None': {
        this.forwards = false;
        this.left = false;
        this.right = false;
        this.backwards = false;
        break;
      }
    }
  }
}

