import spawnPointSmallFrameImage from '../../assets/images/SpawnPint/SpawnPointSmall.png';
import spawnPointMediumFrameImage from '../../assets/images/SpawnPint/SpawnPointMedium.png';

export class SpawnPointTextures {
  textures: HTMLImageElement[] = [];

  constructor(spawnPointSmallFrameImageSrc: string, spawnPointMediumFrameImageSrc: string) {
    this.textures.push(new Image());
    this.textures[0].src = spawnPointSmallFrameImageSrc;
    this.textures.push(new Image());
    this.textures[1].src = spawnPointMediumFrameImageSrc;
    this.textures.push(new Image());
    this.textures[2].src = spawnPointSmallFrameImageSrc;
    this.textures.push(new Image());
    this.textures[3].src = spawnPointMediumFrameImageSrc;
    this.textures.push(new Image());
    this.textures[4].src = spawnPointSmallFrameImageSrc;
  }
}

export const spawnPointTextures = new SpawnPointTextures(spawnPointSmallFrameImage, spawnPointMediumFrameImage);

