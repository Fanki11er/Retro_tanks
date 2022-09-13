import { ChangeDirectionTextures } from '../../Classes/ChangeDirectionTextures/ChangeDirectionTextures';
import enemyFastTank1Forward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_forward.png';
import enemyFast2Tank1Forward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_forward.png';
import enemyFastTank1Backward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_backward.png';
import enemyFastTank2Backward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_backward.png';
import enemyFastTank1Left from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_left.png';
import enemyFastTank2Left from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_left.png';
import enemyFastTank1Right from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_right.png';
import enemyFastTank2Right from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_right.png';
import enemyFastTank1SpecialForward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_special_forward.png';
import enemyFast2Tank1SpecialForward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_special_forward.png';
import enemyFastTank1SpecialBackward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_special_backward.png';
import enemyFastTank2SpecialBackward from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_special_backward.png';
import enemyFastTank1SpecialLeft from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_special_left.png';
import enemyFastTank2SpecialLeft from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_special_left.png';
import enemyFastTank1SpecialRight from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_1_special_right.png';
import enemyFastTank2SpecialRight from '../../assets/images/Tanks/EnemyTanks/Enemy_fast_tank_2_special_right.png';

export const enemyFastTankTextures = new ChangeDirectionTextures(22);
enemyFastTankTextures.addTextures(enemyFastTank1Forward, 'Forwards');
enemyFastTankTextures.addTextures(enemyFast2Tank1SpecialForward, 'Forwards');
enemyFastTankTextures.addTextures(enemyFast2Tank1Forward, 'Forwards');
enemyFastTankTextures.addTextures(enemyFastTank1SpecialForward, 'Forwards');

enemyFastTankTextures.addTextures(enemyFastTank1Backward, 'Backwards');
enemyFastTankTextures.addTextures(enemyFastTank2SpecialBackward, 'Backwards');
enemyFastTankTextures.addTextures(enemyFastTank2Backward, 'Backwards');
enemyFastTankTextures.addTextures(enemyFastTank1SpecialBackward, 'Backwards');

enemyFastTankTextures.addTextures(enemyFastTank1Left, 'Left');
enemyFastTankTextures.addTextures(enemyFastTank2SpecialLeft, 'Left');
enemyFastTankTextures.addTextures(enemyFastTank2Left, 'Left');
enemyFastTankTextures.addTextures(enemyFastTank1SpecialLeft, 'Left');

enemyFastTankTextures.addTextures(enemyFastTank1Right, 'Right');
enemyFastTankTextures.addTextures(enemyFastTank2SpecialRight, 'Right');
enemyFastTankTextures.addTextures(enemyFastTank2Right, 'Right');
enemyFastTankTextures.addTextures(enemyFastTank1SpecialRight, 'Right');

