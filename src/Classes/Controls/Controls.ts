import { Direction } from "../../Types/Types";

export class Controls{
    forwards
    left
    right
    backwards
    constructor(){
        this.forwards = false;
        this.left =  false;
        this.right = false;
        this.backwards = false;
    }

    public setDirection(direction: Direction){
        switch(direction){
            case 'Forwards':{
                this.forwards = true;
                break;
            }
            case 'Left': {
                this.left = true;
                break;
            }
            case 'Right':{
                this.right = true;
                break;
            }
            case 'Backwards':{
                this.backwards = true;
                break;
            }
            case "None":{
                this.forwards = false;
                this.left = false;
                this.right=  false;
                this.backwards = false;
                break;
            }
           
        }
    }
}