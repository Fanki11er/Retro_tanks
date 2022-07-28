import { Controls } from "../Controls/Controls"

export class Tank {
    xPos
    yPos
    width
    height
    controls
    image

    constructor(xPos: number, yPos: number, width: number, height: number, image: HTMLImageElement){
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width ;
        this.height =height;
        this.controls = new Controls()
        this.image = image


    }

    public draw(context: CanvasRenderingContext2D){
        context.drawImage(this.image, this.xPos, this.yPos);
    }

    public update(){
        if(this.controls.forwards){
            this.yPos -= 1;
        }
        if(this.controls.backwards){
            this.yPos += 1;
        }
        if(this.controls.left){
            this.xPos -= 1;
        }
        if(this.controls.right){
            this.xPos += 1;
        }
    }
}