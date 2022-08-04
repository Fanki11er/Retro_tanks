import smallExplosionImage from '../../assets/images/Explosions/Explosion_small.png';
import mediumExplosionImage from '../../assets/images/Explosions/Explosion_medium.png';
import largeExplosionImage from '../../assets/images/Explosions/Explosion_large.png';
import veryLargeExplosionImage from '../../assets/images/Explosions/Explosion_very_large.png';

export class ExplosionTextures {
  smallExplosionTexture: HTMLImageElement;
  mediumExplosionTexture: HTMLImageElement;
  largeExplosionTexture: HTMLImageElement;
  veryLargeExplosionTexture: HTMLImageElement;

  constructor(smallExplosionImageSrc: string, mediumExplosionImageSrc: string, largeExplosionImageSrc: string, veryLargeExplosionImageSrc: string) {
    this.smallExplosionTexture = new Image();
    this.smallExplosionTexture.src = smallExplosionImageSrc;
    this.mediumExplosionTexture = new Image();
    this.mediumExplosionTexture.src = mediumExplosionImageSrc;
    this.largeExplosionTexture = new Image();
    this.largeExplosionTexture.src = largeExplosionImageSrc;
    this.veryLargeExplosionTexture = new Image();
    this.veryLargeExplosionTexture.src = veryLargeExplosionImageSrc;
  }
}

export const explosionTextures = new ExplosionTextures(smallExplosionImage, mediumExplosionImage, largeExplosionImage, veryLargeExplosionImage);

