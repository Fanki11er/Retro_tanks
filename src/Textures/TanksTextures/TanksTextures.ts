import userSmallTankImageTop from '../../assets/images/Light_tank_up.png';
import userSmallTankImageDown from '../../assets/images/Light_tank_down.png';
import userSmallTankImageLeft from '../../assets/images/Light_tank_left.png';
import userSmallTankImageRight from '../../assets/images/Light_tank_right.png';

export class TankTextures {
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

export const userSmallTankTextures = new TankTextures(userSmallTankImageTop, userSmallTankImageDown, userSmallTankImageLeft, userSmallTankImageRight);

