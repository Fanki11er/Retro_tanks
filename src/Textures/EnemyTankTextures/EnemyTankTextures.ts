import { TankTypesTextures } from '../../Types/Types';
import { enemyFastTankTextures } from './EnemyFastTankTextures';
import { enemySmallTankTextures } from './EnemySmallTankTextures';

const enemyTankTextures: TankTypesTextures = {
  Small: enemySmallTankTextures,
  Fast: enemyFastTankTextures,
  Medium: enemyFastTankTextures,
};

export { enemyTankTextures };

