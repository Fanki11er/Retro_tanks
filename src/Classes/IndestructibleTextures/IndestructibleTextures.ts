import indestructibleAnimationSmallImage from '../../assets/images/Indestructible/Indestructible_small.png';
import indestructibleAnimationMediumImage from '../../assets/images/Indestructible/Indestructible_medium.png';
import { AnimationTextures } from '../AnimationTextures/AnimationTextures';

const indestructibleTextures = new AnimationTextures(26);
indestructibleTextures.addTextures(indestructibleAnimationSmallImage);
indestructibleTextures.addTextures(indestructibleAnimationMediumImage);

export default indestructibleTextures;

