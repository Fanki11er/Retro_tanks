import { BrickWall } from '../Classes/BrickWall/BrickWall';
import { Level } from '../Classes/Level/Level';
import { brickWallRecipe } from '../Textures/BrickWall/BrickWallTexture';

const level1 = new Level();
level1.staticObjects.push(new BrickWall(10, 10, 24, brickWallRecipe, 'Vertically', 3));
level1.staticObjects.push(new BrickWall(100, 100, 24, brickWallRecipe, 'Horizontally', 3));
level1.staticObjects.push(new BrickWall(144, 64, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(120, 160, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(144, 160, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(144, 136, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(144, 112, 24, brickWallRecipe, 'Full', 3));
level1.staticObjects.push(new BrickWall(120, 136, 24, brickWallRecipe, 'Full', 3));

export { level1 };

