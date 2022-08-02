import bulletImageUp from '../../assets/images/Bullets/Bullet_up.png';
import bulletImageDown from '../../assets/images/Bullets/Bullet_down.png';
import bulletImageLeft from '../../assets/images/Bullets/Bullet_left.png';
import bulletImageRight from '../../assets/images/Bullets/Bullet_right.png';

export class BulletTextures {
  upDirectionTexture: HTMLImageElement;
  downDirectionTexture: HTMLImageElement;
  leftDirectionTexture: HTMLImageElement;
  rightDirectionTexture: HTMLImageElement;

  constructor(upImageSrc: string, downImageSrc: string, leftImageSrc: string, rightImageSrc: string) {
    this.upDirectionTexture = new Image();
    this.upDirectionTexture.src = upImageSrc;
    this.downDirectionTexture = new Image();
    this.downDirectionTexture.src = downImageSrc;
    this.leftDirectionTexture = new Image();
    this.leftDirectionTexture.src = leftImageSrc;
    this.rightDirectionTexture = new Image();
    this.rightDirectionTexture.src = rightImageSrc;
  }
}

export const bulletTextures = new BulletTextures(bulletImageUp, bulletImageDown, bulletImageLeft, bulletImageRight);

