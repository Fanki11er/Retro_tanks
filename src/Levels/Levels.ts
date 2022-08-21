import { BrickWall } from '../Classes/BrickWall/BrickWall';
import { ConcreteWall } from '../Classes/ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../Classes/ConcreteWallTextures/ConcreteWallTextures';
import { Eagle } from '../Classes/Eagle/Eagle';
import { Level } from '../Classes/Level/Level';
import { brickWallRecipe } from '../Textures/BrickWall/BrickWallTexture';

const level1 = new Level();
level1.staticObjects.push(new BrickWall(44, 28, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(44, 52, 24, brickWallRecipe, 'Full', 3));
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

export { level1 };

