import { StaticDrawable } from '../../Types/Types';
import { Tank } from '../Tank/Tank';

export class Level {
  public staticObjects: StaticDrawable[] = [];
  public enemyTanks: Tank[] = [];
  public userTanks: Tank[] = [];
}

