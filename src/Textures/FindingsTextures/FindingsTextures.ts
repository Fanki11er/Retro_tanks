import tankFindingImage from '../../assets/images/Findings/TankFinding.png';
import grenadeFindingImage from '../../assets/images/Findings/GrenadeFinding.png';
import helmetFindingImage from '../../assets/images/Findings/HelmetFinding.png';
import stopwatchFindingImage from '../../assets/images/Findings/StopwatchFinding.png';
import shovelFindingImage from '../../assets/images/Findings/ShovelFinding.png';
import starFindingImage from '../../assets/images/Findings/StarFinding.png';
export class FindingsTextures {
  tankFindingTexture: HTMLImageElement;
  grenadeFindingTexture: HTMLImageElement;
  helmetFindingTexture: HTMLImageElement;
  stopwatchFindingTexture: HTMLImageElement;
  shovelFindingTexture: HTMLImageElement;
  starFindingTexture: HTMLImageElement;

  constructor(
    tankFindingImageSrc: string,
    grenadeFindingImageSrc: string,
    helmetFindingImageSrc: string,
    stopwatchFindingImageSrc: string,
    shovelFindingImageSrc: string,
    starFindingImageSrc: string,
  ) {
    this.tankFindingTexture = new Image();
    this.tankFindingTexture.src = tankFindingImageSrc;
    this.grenadeFindingTexture = new Image();
    this.grenadeFindingTexture.src = grenadeFindingImageSrc;
    this.helmetFindingTexture = new Image();
    this.helmetFindingTexture.src = helmetFindingImageSrc;
    this.stopwatchFindingTexture = new Image();
    this.stopwatchFindingTexture.src = stopwatchFindingImageSrc;
    this.shovelFindingTexture = new Image();
    this.shovelFindingTexture.src = shovelFindingImageSrc;
    this.starFindingTexture = new Image();
    this.starFindingTexture.src = starFindingImageSrc;
  }
}

export const findingsTextures = new FindingsTextures(
  tankFindingImage,
  grenadeFindingImage,
  helmetFindingImage,
  stopwatchFindingImage,
  shovelFindingImage,
  starFindingImage,
);

