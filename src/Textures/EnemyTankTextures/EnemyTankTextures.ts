import { ChangeDirectionTextures } from '../../Classes/ChangeDirectionTextures/ChangeDirectionTextures';
import enemySmallTank1Forward from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_forward.png';
import enemySmall2Tank1Forward from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_2_forward.png';
import enemySmallTank1Backward from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_backward.png';
import enemySmallTank2Backward from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_2_backward.png';
import enemySmallTank1Left from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_left.png';
import enemySmallTank2Left from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_2_left.png';
import enemySmallTank1Right from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_1_right.png';
import enemySmallTank2Right from '../../assets/images/Tanks/EnemyTanks/Enemy_small_tank_2_right.png';
import { TankTypesTextures } from '../../Types/Types';

const enemySmallTankTextures = new ChangeDirectionTextures(22);
enemySmallTankTextures.addTextures(enemySmallTank1Forward, 'Forwards');
enemySmallTankTextures.addTextures(enemySmall2Tank1Forward, 'Forwards');
enemySmallTankTextures.addTextures(enemySmallTank1Backward, 'Backwards');
enemySmallTankTextures.addTextures(enemySmallTank2Backward, 'Backwards');
enemySmallTankTextures.addTextures(enemySmallTank1Left, 'Left');
enemySmallTankTextures.addTextures(enemySmallTank2Left, 'Left');
enemySmallTankTextures.addTextures(enemySmallTank1Right, 'Right');
enemySmallTankTextures.addTextures(enemySmallTank2Right, 'Right');

const enemyTankTextures: TankTypesTextures = {
  Small: enemySmallTankTextures,
};

export { enemyTankTextures };

