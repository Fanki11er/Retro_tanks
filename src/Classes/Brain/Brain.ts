import { Direction } from '../../Types/Types';
import { EnemyTank } from '../EnemyTank/EnemyTank';
import { Game } from '../Game/Game';
import { FrontTankSensor, LeftTankSensor, RearTankSensor, RightTankSensor } from '../TankSensor/TankSensor';

export class Brain {
  private forwardReading = 1;
  private leftReading = 1;
  private rightReading = 1;
  private backwardReading = 1;
  private heightReading = 0;
  private frontSensor: FrontTankSensor;
  private leftSensor: LeftTankSensor;
  private rightSensor: RightTankSensor;
  private rearSensor: RearTankSensor;
  constructor(private tank: EnemyTank, game: Game) {
    this.frontSensor = new FrontTankSensor(tank, game, 0);
    this.leftSensor = new LeftTankSensor(tank, game, 10);
    this.rightSensor = new RightTankSensor(tank, game, 10);
    this.rearSensor = new RearTankSensor(tank, game, 10);
  }

  checkForBlockade(direction: Direction) {
    if (direction === 'Forwards' && this.forwardReading < 1) {
      return true;
    } else if (direction === 'Backwards' && this.backwardReading < 1) {
      return true;
    } else if (direction === 'Left' && this.leftReading < 1) {
      return true;
    } else if (direction === 'Right' && this.rightReading < 1) {
      return true;
    }
    return false;
  }
  getValues() {
    return [this.forwardReading, this.leftReading, this.rightReading, this.backwardReading, this.heightReading];
  }
  updateValue(valueName: 'forwardReading' | 'leftReading' | 'rightReading' | 'backwardReading' | 'heightReading', value: number) {
    //console.log(valueName, 'Name');
    this[valueName] = value;
  }
  resetValues() {
    this.forwardReading = 1;
    this.leftReading = 1;
    this.rightReading = 1;
    this.backwardReading = 1;
    this.heightReading = 0;
  }

  update() {
    this.resetValues();
    this.frontSensor.update();
    this.leftSensor.update();
    this.rightSensor.update();
    this.rearSensor.update();

    console.log(this.forwardReading, this.leftReading, this.rightReading, this.backwardReading);
  }

  private setDirection(outputs: number[]) {
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[0]) {
        this.tank.controls.setDirection('Forwards');
      } else if (outputs[1]) {
        this.tank.controls.setDirection('Left');
      } else if (outputs[2]) {
        this.tank.controls.setDirection('Right');
      } else if (outputs[3]) {
        this.tank.controls.setDirection('Backwards');
      } else this.tank.controls.setDirection('None');
    }
  }

  drawSensors(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'blue';
    if (this.frontSensor.isCollision) {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(this.frontSensor.A.x, this.frontSensor.A.y, this.frontSensor.width, this.frontSensor.height);

    ctx.fillStyle = 'blue';
    if (this.leftSensor.isCollision) {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(this.leftSensor.A.x, this.leftSensor.A.y, this.leftSensor.width, this.leftSensor.height);

    ctx.fillStyle = 'blue';
    if (this.rightSensor.isCollision) {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(this.rightSensor.A.x, this.rightSensor.A.y, this.rightSensor.width, this.rightSensor.height);

    ctx.fillStyle = 'blue';
    if (this.rearSensor.isCollision) {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(this.rearSensor.A.x, this.rearSensor.A.y, this.rearSensor.width, this.rearSensor.height);
  }
}

