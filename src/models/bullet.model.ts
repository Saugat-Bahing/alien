import { CanvasService } from "../services/canvas.service";

export class BulletModel {
    private xPosition: number;
    private yPosition: number;
    private velocity: number;
    private canvasService: CanvasService;
    private context: CanvasRenderingContext2D;
    private bulletHeight:number;
    private bulletWidth: number;
    private destroy: Function;

    constructor(xPos:number, destroy: Function){
        this.canvasService = CanvasService.getInstance();
        this.context = this.canvasService.getContext();
        this.destroy = destroy;
        this.xPosition = xPos;
        this.yPosition = this.canvasService.getHeight() - 50;
        this.velocity = 15;
        this.bulletHeight = 6;
        this.bulletWidth = 3;
    }

    move(){
        const newPos = this.yPosition - this.velocity;
        if(newPos + this.bulletHeight < 0){
            // destroy
            this.destroy(this);
        }
        else {
            this.yPosition = newPos;
        }
    }

    public render(){
        this.context.fillStyle = "#FF0000";
        this.context.fillRect(this.xPosition, this.yPosition, this.bulletWidth, this.bulletHeight);
        this.move();
    }
}