import { BrickWall } from '../Classes/BrickWall/BrickWall';
import { Level } from '../Classes/Level/Level';
import { brickTextures } from '../Textures/BrickWall/BrickWallTexture';

const Level1 = new Level();
Level1.staticObjects.push(new BrickWall(0, 0, 24, brickTextures, 'Vertically'));
Level1.staticObjects.push(new BrickWall(100, 100, 24, brickTextures, 'Horizontally'));
Level1.staticObjects.push(new BrickWall(120, 160, 24, brickTextures, 'Full'));
Level1.staticObjects.push(new BrickWall(120, 210, 24, brickTextures, 'Full'));

export { Level1 };

