import smallExplosionImage from '../../assets/images/Explosions/Explosion_small.png';
import mediumExplosionImage from '../../assets/images/Explosions/Explosion_medium.png';
import largeExplosionImage from '../../assets/images/Explosions/Explosion_large.png';
import veryLargeExplosionImage from '../../assets/images/Explosions/Explosion_very_large.png';
import { AnimationTextures } from '../../Classes/AnimationTextures/AnimationTextures';

const explosionTextures = new AnimationTextures(30);
explosionTextures.addTextures(smallExplosionImage);
explosionTextures.addTextures(mediumExplosionImage);
explosionTextures.addTextures(largeExplosionImage);
explosionTextures.addTextures(veryLargeExplosionImage);
export default explosionTextures;

