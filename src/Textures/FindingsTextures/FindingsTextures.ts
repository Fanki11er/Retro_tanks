import tankFindingImage from '../../assets/images/Findings/TankFinding.png';
export class FindingsTextures {
  tankFindingTexture: HTMLImageElement;

  constructor(tankFindingImageSrc: string) {
    this.tankFindingTexture = new Image();
    this.tankFindingTexture.src = tankFindingImageSrc;
  }
}

export const findingsTextures = new FindingsTextures(tankFindingImage);

