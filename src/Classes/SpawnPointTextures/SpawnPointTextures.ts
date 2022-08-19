import spawnPointSmallFrameImage from '../../assets/images/SpawnPint/Spawn_point_small.png';
import spawnPointMediumFrameImage from '../../assets/images/SpawnPint/Spawn_point_medium.png';
import spawnPointLargeFrameImage from '../../assets/images/SpawnPint/Spawn_point_large.png';
import spawnPointVeryLargeFrameImage from '../../assets/images/SpawnPint/Spawn_point_very_large.png';
import { AnimationTextures } from '../AnimationTextures/AnimationTextures';

const spawnPointTextures = new AnimationTextures(22);

spawnPointTextures.addTextures(spawnPointSmallFrameImage);
spawnPointTextures.addTextures(spawnPointMediumFrameImage);
spawnPointTextures.addTextures(spawnPointLargeFrameImage);
spawnPointTextures.addTextures(spawnPointVeryLargeFrameImage);
spawnPointTextures.addTextures(spawnPointLargeFrameImage);
spawnPointTextures.addTextures(spawnPointMediumFrameImage);

export default spawnPointTextures;

