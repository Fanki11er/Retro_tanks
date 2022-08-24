import { BrickWall } from '../Classes/BrickWall/BrickWall';
import { ConcreteWall } from '../Classes/ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../Classes/ConcreteWallTextures/ConcreteWallTextures';
import { Eagle } from '../Classes/Eagle/Eagle';
import { Level } from '../Classes/Level/Level';
import { brickWallRecipe } from '../Textures/BrickWall/BrickWallTexture';
import { BoardElementType, LevelRecipe, MaterialType } from '../Types/Types';
import { Utils } from '../Utils/Utils';

/*const level1 = new Level();
//level1.staticObjects.push(new BrickWall(44, 28, 24, brickWallRecipe, 'Full', 3));
//level1.staticObjects.push(new BrickWall(44, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(92, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(92, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(140, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(140, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(188, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(188, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(236, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(236, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(284, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(284, 52, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new ConcreteWall(300, 120, 24, concreteWallRecipe, 'Full', 12));
//Eagle bunker
level1.staticObjects.push(new BrickWall(152, 292, 24, brickWallRecipe, 'Vertically', 3));
level1.staticObjects.push(new BrickWall(188, 292, 24, brickWallRecipe, 'Vertically', 3));
level1.staticObjects.push(new BrickWall(152, 280, 24, brickWallRecipe, 'Horizontally', 3));
level1.staticObjects.push(new BrickWall(176, 280, 24, brickWallRecipe, 'Horizontally', 3));
//Eagle
level1.staticObjects.push(new Eagle(164, 292, 24));

export { level1 };*/

export const levels: LevelRecipe[] = [
  {
    staticObjectsRecipe: [
      Utils.makeStaticObjectRecipe('Brick', 20, 160, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Concrete', 20, 172, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Brick', 44, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 76, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 100, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 124, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Brick', 44, 208, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Brick', 44, 220, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 244, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 44, 268, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 68, 160, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 76, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 100, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 160, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 124, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Brick', 92, 208, 'Horizontally'),
      Utils.makeStaticObjectRecipe('Brick', 92, 220, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 244, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 92, 268, 'Full'),

      Utils.makeStaticObjectRecipe('Brick', 140, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 140, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 188, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 188, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 236, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 236, 52, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 284, 28, 'Full'),
      Utils.makeStaticObjectRecipe('Brick', 284, 52, 'Full'),
    ],
    eagle: { xPos: 164, yPos: 292, size: 24 },
    eagleBorders: [],
  },
];

