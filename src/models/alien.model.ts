import { CanvasService } from "../services/canvas.service";
import { SpriteService } from "../services/sprites.services";

export class AlienModel {
    private width: number;
    private height: number;
    private xPosition: number;
    private yPosition: number;
    private canvasService: CanvasService;
    private context: CanvasRenderingContext2D;
    private alienSprite: HTMLImageElement;
    private velocity: number;

    constructor(width: number, height: number, xPos: number, yPos: number) {
        this.height = height;
        this.width = width;
        this.xPosition = xPos;
        this.yPosition = yPos;
        this.velocity = 3;
        this.canvasService = CanvasService.getInstance();
        this.context = this.canvasService.getContext();
        this.alienSprite = SpriteService.getInstance().getSprite("alien");
    }

    public moveX(direction: 1 | -1){
        this.xPosition += this.velocity * direction;
    }

    public moveY(distance: number){
        const newYPos = this.yPosition + distance;
        if(newYPos + this.height < this.canvasService.getHeight()){
            this.yPosition = newYPos;
        }
    }

    public getxPosition(){
        return this.xPosition;
    }

    render() {
        this.context.drawImage(this.alienSprite, this.xPosition, this.yPosition, this. width, this.height);
    }
}