import type { Direction } from "../../Types/Types";
import { EnemyTank } from "../EnemyTank/EnemyTank";
import { Game } from "../Game/Game";
//import { NeuralNetwork } from "../NeuralNetwork/NeuralNetwork/NeuralNetwork";
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
  //private neuralNetwork!: NeuralNetwork;
  //private brainScore = 0;
  private tank: EnemyTank;
  private game: Game;

  constructor(tank: EnemyTank, game: Game) {
    this.tank = tank;
    this.game = game;
    this.frontSensor = new FrontTankSensor(tank, game, 3);
    this.leftSensor = new LeftTankSensor(tank, game, 10);
    this.rightSensor = new RightTankSensor(tank, game, 10);
    this.rearSensor = new RearTankSensor(tank, game, 10);

    //this.neuralNetwork = new NeuralNetwork([6, 12, 12, 4]);
    //this.setNeuralNetwork();
    this.setRandomChangeDirectionTimeout(2000);
  }

  setRandomChangeDirectionTimeout = (timeout: number) => {
    const newRandomTimeoutTime = Math.random() * 4000 + 2000; // Random timeout between 2 and 8 seconds

    setTimeout(() => {
      this.setNewRandomDirection([
        this.forwardReading,
        this.leftReading,
        this.rightReading,
        this.backwardReading,
      ]);
      this.setRandomChangeDirectionTimeout(newRandomTimeoutTime);
    }, timeout);
  };

  checkForBlockade(direction: Direction) {
    if (direction === "Forwards" && this.forwardReading === 1) {
      //console.log("Blocked forwards");
      return true;
    } else if (direction === "Backwards" && this.backwardReading === 1) {
      //console.log("Blocked backwards");
      return true;
    } else if (direction === "Left" && this.leftReading === 1) {
      //console.log("Blocked left");
      return true;
    } else if (direction === "Right" && this.rightReading === 1) {
      //console.log("Blocked right");
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
      // this.convertHeightToReading(),
      // this.convertIsBlocked(),
      //Math.random() * 2 - 1 > 0.9 ? 1 : -1, //Change direction randomly
    ];
  }
  updateValue(
    valueName:
      | "forwardReading"
      | "leftReading"
      | "rightReading"
      | "backwardReading"
      | "heightReading",
    value: number,
  ) {
    //console.log(valueName, 'Name');
    this[valueName] = value;
  }

  resetValues() {
    this.forwardReading = 0;
    this.leftReading = 0;
    this.rightReading = 0;
    this.backwardReading = 0;
  }

  convertHeightToReading() {
    //console.log((this.tank.getCoordinates().y * 1) / 300);
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

    const isBlocked = this.tank.getIsBlocked();
    //console.log(isBlocked, this.tank.controls.direction);
    if (isBlocked) {
      //console.log("Blocked");
      this.tank.controls.setStopTank();
      this.setNewRandomDirection([
        this.forwardReading,
        this.leftReading,
        this.rightReading,
        this.backwardReading,
      ]);
      //console.log(this.tank.controls.direction);
    }
    // const outputs = NeuralNetwork.feedForward(
    //   this.getValues(),
    //   this.neuralNetwork
    // );
    // console.log(this.getValues());
    // console.log(outputs);
    // if (outputs[0] === 1) {

    //}

    //console.log(this.forwardReading, this.leftReading, this.rightReading, this.backwardReading);
  }

  // private setDirection(outputs: number[]) {
  //   //for (let i = 0; i < outputs.length; i++) {
  //   if (!outputs[0]) {
  //     this.tank.controls.setDirection("Forwards");
  //   } else if (!outputs[1]) {
  //     this.tank.controls.setDirection("Left");
  //   } else if (!outputs[2]) {
  //     this.tank.controls.setDirection("Right");
  //   } else if (!outputs[3]) {
  //     this.tank.controls.setDirection("Backwards");
  //   } else this.tank.controls.setDirection("Backwards");
  //   //}
  // }

  private setNewRandomDirection(sensorReadings: number[]) {
    const directions: Direction[] = ["Forwards", "Left", "Right", "Backwards"];
    const nonBlockedDirections: Direction[] = [];

    sensorReadings.forEach((reading, index) => {
      if (reading === 0) {
        nonBlockedDirections.push(directions[index]);
      }
    });

    //console.log("Non-blocked directions:", nonBlockedDirections);

    if (nonBlockedDirections.length > 1) {
      const randomDirection =
        nonBlockedDirections[
          Math.floor(Math.random() * nonBlockedDirections.length)
        ];

      //console.log("Randomly selected direction:", randomDirection);

      this.tank.controls.setDirection(randomDirection);
    } else if (nonBlockedDirections.length === 1) {
      //console.log("Only one non-blocked direction:", nonBlockedDirections[0]);
      this.tank.controls.setDirection(nonBlockedDirections[0]);
    } else {
      this.tank.controls.setDirection("None");
    }

    //console.log("New direction:", this.tank.controls.direction);
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
      this.frontSensor.height,
    );

    ctx.fillStyle = "blue";
    if (this.leftSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.leftSensor.A.x,
      this.leftSensor.A.y,
      this.leftSensor.width,
      this.leftSensor.height,
    );

    ctx.fillStyle = "blue";
    if (this.rightSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.rightSensor.A.x,
      this.rightSensor.A.y,
      this.rightSensor.width,
      this.rightSensor.height,
    );

    ctx.fillStyle = "blue";
    if (this.rearSensor.isCollision) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.rearSensor.A.x,
      this.rearSensor.A.y,
      this.rearSensor.width,
      this.rearSensor.height,
    );
  }

  // getBrainScore() {
  //   //console.log(this.brainScore + this.tank.getCoordinates().y * 0.02);
  //   return this.brainScore + this.tank.getCoordinates().y;
  // }

  // saveBrain() {
  //   console.log(this.brainScore);
  //   if (!localStorage.getItem("BestBrain")) {
  //     localStorage.setItem(
  //       "BestBrain",
  //       JSON.stringify({
  //         score: this.getBrainScore(),
  //         network: this.neuralNetwork,
  //       })
  //     );
  //   } else {
  //     const { score } = JSON.parse(localStorage.getItem("BestBrain")!);
  //     if (this.getBrainScore() > score) {
  //       localStorage.setItem(
  //         "BestBrain",
  //         JSON.stringify({
  //           score: this.getBrainScore(),
  //           network: this.neuralNetwork,
  //         })
  //       );
  //     }
  //   }
  //   return this.getBrainScore();
  // }

  //   discardBrain() {
  //     localStorage.removeItem("BestBrain");
  //   }

  //   setNeuralNetwork() {
  //     const network = localStorage.getItem("BestBrain");
  //     if (network) {
  //       this.neuralNetwork = JSON.parse(network).network;
  //       //if (this.game.enemyTanks.length) {
  //       NeuralNetwork.mutate(this.neuralNetwork, 0.4);
  //       //}
  //     } else {
  //       this.neuralNetwork = new NeuralNetwork([7, 14, 14, 4]);
  //     }
  //   }
}
