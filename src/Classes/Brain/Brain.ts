import type { Direction } from "../../Types/Types";
import { EnemyTank } from "../EnemyTank/EnemyTank";
import { Game } from "../Game/Game";
import { NeuralNetwork } from "../NeuralNetwork/NeuralNetwork/NeuralNetwork";
import {
  FrontTankSensor,
  LeftTankSensor,
  RearTankSensor,
  RightTankSensor,
} from "../TankSensor/TankSensor";

export class Brain {
  private forwardReading = 0;
  private leftReading = 0;
  private rightReading = 0;
  private backwardReading = 0;
  private heightReading = 0;
  private frontSensor: FrontTankSensor;
  private leftSensor: LeftTankSensor;
  private rightSensor: RightTankSensor;
  private rearSensor: RearTankSensor;
  private neuralNetwork!: NeuralNetwork;
  private brainScore = 0;
  private tank: EnemyTank;
  private game: Game;

  constructor(tank: EnemyTank, game: Game) {
    this.tank = tank;
    this.game = game;
    this.frontSensor = new FrontTankSensor(tank, game, 0);
    this.leftSensor = new LeftTankSensor(tank, game, 10);
    this.rightSensor = new RightTankSensor(tank, game, 10);
    this.rearSensor = new RearTankSensor(tank, game, 10);
    //this.neuralNetwork = new NeuralNetwork([6, 12, 12, 4]);
    this.setNeuralNetwork();
  }

  checkForBlockade(direction: Direction) {
    if (direction === "Forwards" && this.forwardReading > 0) {
      return true;
    } else if (direction === "Backwards" && this.backwardReading > 0) {
      return true;
    } else if (direction === "Left" && this.leftReading > 0) {
      return true;
    } else if (direction === "Right" && this.rightReading > 0) {
      return true;
    }
    return false;
  }
  getValues() {
    return [
      this.forwardReading,
      this.leftReading,
      this.rightReading,
      this.backwardReading,
      this.convertHeightToReading(),
      this.convertIsBlocked(),
    ];
  }
  updateValue(
    valueName:
      | "forwardReading"
      | "leftReading"
      | "rightReading"
      | "backwardReading"
      | "heightReading",
    value: number
  ) {
    //console.log(valueName, 'Name');
    this[valueName] = value;
  }
  resetValues() {
    this.forwardReading = 0;
    this.leftReading = 0;
    this.rightReading = 0;
    this.backwardReading = 0;
    //this.heightReading = 0;
  }

  convertHeightToReading() {
    return Number(((this.tank.getCoordinates().y * 1) / 300).toFixed(2));
  }
  convertIsBlocked() {
    if (this.tank.getIsBlocked()) {
      return 1;
    }
    return 0;
  }

  update() {
    this.resetValues();
    this.frontSensor.update();
    this.leftSensor.update();
    this.rightSensor.update();
    this.rearSensor.update();

    const outputs = NeuralNetwork.feedForward(
      this.getValues(),
      this.neuralNetwork
    );
    //console.log(outputs);
    this.setDirection(outputs);

    //console.log(this.forwardReading, this.leftReading, this.rightReading, this.backwardReading);
  }

  private setDirection(outputs: number[]) {
    for (let i = 0; i < outputs.length; i++) {
      if (!outputs[0]) {
        this.tank.controls.setDirection("Forwards");
      } else if (!outputs[1]) {
        this.tank.controls.setDirection("Left");
      } else if (!outputs[2]) {
        this.tank.controls.setDirection("Right");
      } else if (!outputs[3]) {
        this.tank.controls.setDirection("Backwards");
      } else this.tank.controls.setDirection("Backwards");
    }
  }

  drawSensors(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "blue";
    if (this.frontSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.frontSensor.A.x,
      this.frontSensor.A.y,
      this.frontSensor.width,
      this.frontSensor.height
    );

    ctx.fillStyle = "blue";
    if (this.leftSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.leftSensor.A.x,
      this.leftSensor.A.y,
      this.leftSensor.width,
      this.leftSensor.height
    );

    ctx.fillStyle = "blue";
    if (this.rightSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.rightSensor.A.x,
      this.rightSensor.A.y,
      this.rightSensor.width,
      this.rightSensor.height
    );

    ctx.fillStyle = "blue";
    if (this.rearSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.rearSensor.A.x,
      this.rearSensor.A.y,
      this.rearSensor.width,
      this.rearSensor.height
    );
  }

  getBrainScore() {
    return this.brainScore + this.tank.getCoordinates().y * 0.08;
  }

  saveBrain() {
    if (!localStorage.getItem("BestBrain")) {
      localStorage.setItem(
        "BestBrain",
        JSON.stringify({
          score: this.getBrainScore(),
          network: this.neuralNetwork,
        })
      );
    } else {
      const { score } = JSON.parse(localStorage.getItem("BestBrain")!);
      if (this.getBrainScore() > score) {
        localStorage.setItem(
          "BestBrain",
          JSON.stringify({
            score: this.getBrainScore(),
            network: this.neuralNetwork,
          })
        );
      }
    }
    return this.getBrainScore();
  }

  discardBrain() {
    localStorage.removeItem("BestBrain");
  }

  setNeuralNetwork() {
    const network = localStorage.getItem("BestBrain");
    if (network) {
      this.neuralNetwork = JSON.parse(network).network;
      //if (this.game.enemyTanks.length) {
      NeuralNetwork.mutate(this.neuralNetwork, 0.1);
      //}
    } else {
      this.neuralNetwork = new NeuralNetwork([6, 12, 12, 4]);
    }
  }
}
