import { Direction } from '../../Types/Types';

export class Controls {
  forwards;
  left;
  right;
  backwards;
  constructor() {
    this.forwards = false;
    this.left = false;
    this.right = false;
    this.backwards = false;
  }

  public setDirection(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        this.forwards = true;
        this.left = false;
        this.right = false;
        this.backwards = false;
        break;
      }
      case 'Left': {
        this.forwards = false;
        this.left = true;
        this.right = false;
        this.backwards = false;
        break;
      }
      case 'Right': {
        this.forwards = false;
        this.left = false;
        this.right = true;
        this.backwards = false;
        break;
      }
      case 'Backwards': {
        this.forwards = false;
        this.left = false;
        this.right = false;
        this.backwards = true;

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

