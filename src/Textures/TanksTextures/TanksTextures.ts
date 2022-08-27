import { ChangeDirectionTextures } from '../../Classes/ChangeDirectionTextures/ChangeDirectionTextures';
import player1SmallTank1Forward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_forward.png';
import player1Small2Tank1Forward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_forward.png';
import player1SmallTank1Backward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_backward.png';
import player1SmallTank2Backward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_backward.png';
import player1SmallTank1Left from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_left.png';
import player1SmallTank2Left from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_left.png';
import player1SmallTank1Right from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_right.png';
import player1SmallTank2Right from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_right.png';
import { TankTypesTextures } from '../../Types/Types';

const player1smallTankTextures = new ChangeDirectionTextures(22);
player1smallTankTextures.addTextures(player1SmallTank1Forward, 'Forwards');
player1smallTankTextures.addTextures(player1Small2Tank1Forward, 'Forwards');
player1smallTankTextures.addTextures(player1SmallTank1Backward, 'Backwards');
player1smallTankTextures.addTextures(player1SmallTank2Backward, 'Backwards');
player1smallTankTextures.addTextures(player1SmallTank1Left, 'Left');
player1smallTankTextures.addTextures(player1SmallTank2Left, 'Left');
player1smallTankTextures.addTextures(player1SmallTank1Right, 'Right');
player1smallTankTextures.addTextures(player1SmallTank2Right, 'Right');

const player1TankTextures: TankTypesTextures = {
  Small: player1smallTankTextures,
};

export { player1TankTextures };

