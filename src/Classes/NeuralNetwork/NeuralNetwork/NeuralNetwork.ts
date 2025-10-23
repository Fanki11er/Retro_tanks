import { Utils } from '../../../Utils/Utils';
import { NeuralNetworkLevel } from '../NeuralNetworkLevel/Level';

export class NeuralNetwork {
  levels: NeuralNetworkLevel[] = [];
  constructor(neuronCounts: number[]) {
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new NeuralNetworkLevel(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs: number[], network: NeuralNetwork) {
    let outputs = NeuralNetworkLevel.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = NeuralNetworkLevel.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }

  static mutate(network: NeuralNetwork, amount: number = 1) {
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = Utils.lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = Utils.lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
        }
      }
    });
  }
}

