import { EnemyTankTypes, LevelRecipe, StaticDrawable } from '../../Types/Types';
//import { Tank } from '../Tank/Tank';

export class Level {
  staticObjects: StaticDrawable[] = [];
  enemyTanks: EnemyTankTypes[] = [];
  constructor(levelRecipe: LevelRecipe) {}
}

