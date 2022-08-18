import enemyTankIconImage from '../../assets/images/Icons/Enemy_tank_icon.png';
import playerTankIconImage from '../../assets/images/Icons/Player_tank_icon.png';
import roundFlagIconImage from '../../assets/images/Icons/Round_flag_icon.png';

export class Icon {
  icon: HTMLImageElement;

  constructor(iconSrc: string) {
    this.icon = new Image();
    this.icon.src = iconSrc;
  }
}

export const enemyTankIcon = new Icon(enemyTankIconImage);
export const playerTankIcon = new Icon(playerTankIconImage);
export const roundFlagIcon = new Icon(roundFlagIconImage);

