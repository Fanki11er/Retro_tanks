/*import userSmallTankImageTop from '../../assets/images/Light_tank_up.png';
import userSmallTankImageDown from '../../assets/images/Light_tank_down.png';
import userSmallTankImageLeft from '../../assets/images/Light_tank_left.png';
import userSmallTankImageRight from '../../assets/images/Light_tank_right.png';*/
import { ChangeDirectionTextures } from '../../Classes/ChangeDirectionTextures/ChangeDirectionTextures';
import player1SmallTank1Forward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_forward.png';
import player1Small2Tank1Forward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_forward.png';
import player1SmallTank1Backward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_backward.png';
import player1SmallTank2Backward from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_backward.png';
import player1SmallTank1Left from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_left.png';
import player1SmallTank2Left from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_left.png';
import player1SmallTank1Right from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_1_right.png';
import player1SmallTank2Right from '../../assets/images/Tanks/Player1Tank/Player1_small_tank_2_right.png';

/*export class TankTextures {
  topDirectionTexture: HTMLImageElement;
  downDirectionTexture: HTMLImageElement;
  leftDirectionTexture: HTMLImageElement;
  rightDirectionTexture: HTMLImageElement;

  constructor(topImageSrc: string, downImageSrc: string, leftImageSrc: string, rightImageSrc: string) {
    this.topDirectionTexture = new Image();
    this.topDirectionTexture.src = topImageSrc;
    this.downDirectionTexture = new Image();
    this.downDirectionTexture.src = downImageSrc;
    this.leftDirectionTexture = new Image();
    this.leftDirectionTexture.src = leftImageSrc;
    this.rightDirectionTexture = new Image();
    this.rightDirectionTexture.src = rightImageSrc;
  }
}

export const userSmallTankTextures = new TankTextures(userSmallTankImageTop, userSmallTankImageDown, userSmallTankImageLeft, userSmallTankImageRight);*/

//!! Add Textures and animation to tank

const player1smallTankTextures = new ChangeDirectionTextures(22);
player1smallTankTextures.addTextures(player1SmallTank1Forward, 'Forwards');
player1smallTankTextures.addTextures(player1Small2Tank1Forward, 'Forwards');
player1smallTankTextures.addTextures(player1SmallTank1Backward, 'Backwards');
player1smallTankTextures.addTextures(player1SmallTank2Backward, 'Backwards');
player1smallTankTextures.addTextures(player1SmallTank1Left, 'Left');
player1smallTankTextures.addTextures(player1SmallTank2Left, 'Left');
player1smallTankTextures.addTextures(player1SmallTank1Right, 'Right');
player1smallTankTextures.addTextures(player1SmallTank2Right, 'Right');

export { player1smallTankTextures };

