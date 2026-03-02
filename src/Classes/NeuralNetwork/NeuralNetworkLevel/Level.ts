type weight = number[];

export class NeuralNetworkLevel {
  inputsArray: number[];
  outputsArray: number[];
  biases: number[];
  weights: weight[] = [];
  constructor(inputCount: number, outputCount: number) {
    this.inputsArray = new Array(inputCount);
    this.outputsArray = new Array(outputCount);
    this.biases = new Array(outputCount);

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    NeuralNetworkLevel.randomize(this);
  }

  static randomize(level: NeuralNetworkLevel) {
    for (let i = 0; i < level.inputsArray.length; i++) {
      for (let j = 0; j < level.outputsArray.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs: number[], level: NeuralNetworkLevel) {
    level.inputsArray = [...givenInputs];
    for (let i = 0; i < level.outputsArray.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputsArray.length; j++) {
        sum += level.inputsArray[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputsArray[i] = 1;
      } else {
        level.outputsArray[i] = 0;
      }
    }
    return level.outputsArray;
  }
}
