import { BrickWall } from '../Classes/BrickWall/BrickWall';
import { ConcreteWall } from '../Classes/ConcreteWall/ConcreteWall';
import { concreteWallRecipe } from '../Classes/ConcreteWallTextures/ConcreteWallTextures';
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

export { level1 };

