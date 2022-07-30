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
  isBlocked;

  constructor(xPos: number, yPos: number, width: number, height: number, textures: TankTextures) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
    this.textures = textures;
    this.image = textures.topDirectionTexture;
    this.isBlocked = false;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xPos, this.yPos);
  }

  public update() {
    this.checkForCollisionWithBorders();
    this.checkForCollisionWithObjects(); //ToDo !!

    if (this.controls.forwards) {
      this.setImage(this.textures.topDirectionTexture);

      if (!this.isBlocked) {
        this.yPos -= 0.2;
      }
    }
    if (this.controls.backwards) {
      this.setImage(this.textures.downDirectionTexture);

      if (!this.isBlocked) {
        this.yPos += 0.2;
      }
    }
    if (this.controls.left) {
      this.setImage(this.textures.leftDirectionTexture);

      if (!this.isBlocked) {
        this.xPos -= 0.2;
      }
    }
    if (this.controls.right) {
      this.setImage(this.textures.rightDirectionTexture);

      if (!this.isBlocked) {
        this.xPos += 0.2;
      }
    }
  }

  setImage(correctImage: HTMLImageElement) {
    if (this.image !== correctImage) {
      this.image = correctImage;
    }
  }

  checkForCollisionWithBorders() {
    this.isBlocked = false;
    if (this.controls.forwards) {
      if (this.yPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.backwards) {
      if (this.yPos + this.height >= 312) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.left) {
      if (this.xPos <= 0) {
        this.isBlocked = true;
        return;
      }
    }
    if (this.controls.right) {
      if (this.xPos + this.width >= 312) {
        this.isBlocked = true;
        return;
      }
    }
  }

  checkForCollisionWithObjects() {}
}

