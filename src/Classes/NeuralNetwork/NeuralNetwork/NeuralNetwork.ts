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
}

