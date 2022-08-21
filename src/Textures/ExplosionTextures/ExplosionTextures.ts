import smallExplosionImage from '../../assets/images/Explosions/Explosion_small.png';
import mediumExplosionImage from '../../assets/images/Explosions/Explosion_medium.png';
import largeExplosionImage from '../../assets/images/Explosions/Explosion_large.png';
import veryLargeExplosionImage from '../../assets/images/Explosions/Explosion_very_large.png';
import { AnimationTextures } from '../../Classes/AnimationTextures/AnimationTextures';

const smallExplosionTextures = new AnimationTextures(30);
smallExplosionTextures.addTextures(smallExplosionImage);
smallExplosionTextures.addTextures(mediumExplosionImage);
smallExplosionTextures.addTextures(largeExplosionImage);

const largeExplosionTextures = new AnimationTextures(30);
largeExplosionTextures.addTextures(smallExplosionImage);
largeExplosionTextures.addTextures(mediumExplosionImage);
largeExplosionTextures.addTextures(largeExplosionImage);
largeExplosionTextures.addTextures(veryLargeExplosionImage);

export { smallExplosionTextures, largeExplosionTextures };

