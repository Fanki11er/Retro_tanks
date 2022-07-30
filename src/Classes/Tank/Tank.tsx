import { TankTextures } from '../../Textures/TanksTextures/TanksTextures';
import { Controls } from '../Controls/Controls';

export class Tank {
  xPos;
  yPos;
  width;
  height;
  controls;
  textures: TankTextures;
  image;

  constructor(xPos: number, yPos: number, width: number, height: number, textures: TankTextures) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
    this.textures = textures;
    this.image = textures.topDirectionTexture;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xPos, this.yPos);
  }

  public update() {
    if (this.controls.forwards) {
      this.setImage(this.textures.topDirectionTexture);
      this.yPos -= 0.2;
    }
    if (this.controls.backwards) {
      this.setImage(this.textures.downDirectionTexture);
      this.yPos += 0.2;
    }
    if (this.controls.left) {
      this.xPos -= 0.2;
      this.setImage(this.textures.leftDirectionTexture);
    }
    if (this.controls.right) {
      this.setImage(this.textures.rightDirectionTexture);
      this.xPos += 0.2;
    }
  }

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }
}
