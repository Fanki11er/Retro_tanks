import spawnPointSmallFrameImage from '../../assets/images/SpawnPint/Spawn_point_small.png';
import spawnPointMediumFrameImage from '../../assets/images/SpawnPint/Spawn_point_medium.png';
import spawnPointLargeFrameImage from '../../assets/images/SpawnPint/Spawn_point_large.png';
import spawnPointVeryLargeFrameImage from '../../assets/images/SpawnPint/Spawn_point_very_large.png';

export class SpawnPointTextures {
  textures: HTMLImageElement[] = [];

  constructor(
    spawnPointSmallFrameImageSrc: string,
    spawnPointMediumFrameImageSrc: string,
    spawnPointLargeFrameImageSrc: string,
    spawnPointVeryLargeFrameImageSrc: string,
  ) {
    this.textures.push(new Image());
    this.textures[0].src = spawnPointSmallFrameImageSrc;
    this.textures.push(new Image());
    this.textures[1].src = spawnPointMediumFrameImageSrc;
    this.textures.push(new Image());
    this.textures[2].src = spawnPointLargeFrameImageSrc;
    this.textures.push(new Image());
    this.textures[3].src = spawnPointVeryLargeFrameImageSrc;
    this.textures.push(new Image());
    this.textures[4].src = spawnPointLargeFrameImageSrc;
    this.textures.push(new Image());
    this.textures[5].src = spawnPointMediumFrameImageSrc;
    this.textures.push(new Image());
    this.textures[6].src = spawnPointSmallFrameImageSrc;
  }
}

export const spawnPointTextures = new SpawnPointTextures(
  spawnPointSmallFrameImage,
  spawnPointMediumFrameImage,
  spawnPointLargeFrameImage,
  spawnPointVeryLargeFrameImage,
);

