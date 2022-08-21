import NotDamagedEagleImage from '../../assets/images/Eagle/Eagle.png';
import DamagedEagleImage from '../../assets/images/Eagle/Eagle_destroyed.png';

class EagleTextures {
  notDamagedTexture: HTMLImageElement;
  damagedTexture: HTMLImageElement;
  textureSize: number;

  constructor(notDamagedEagleImageSrc: string, damagedEagleImageSrc: string, textureSize: number) {
    this.notDamagedTexture = new Image();
    this.notDamagedTexture.src = notDamagedEagleImageSrc;
    this.damagedTexture = new Image();
    this.damagedTexture.src = damagedEagleImageSrc;
    this.textureSize = textureSize;
  }
}

export const eagleTextures = new EagleTextures(NotDamagedEagleImage, DamagedEagleImage, 24);

