import { AlienModel } from "../models/alien.model";
import { CanvasService } from "../services/canvas.service";

export class AlienManager{
    private alienWidth: number;
    private alienHeight: number;
    private alienXCount: number;
    private alienYCount: number;
    private alienXPadding: number;
    private alienXCoverage: number;
    private xPadding: number;  
    private canvasService: CanvasService;
    private fleet: AlienModel[];
    private direction: 1 | -1;
    private verticalMove: boolean; 

    constructor(){
        this.canvasService = CanvasService.getInstance();
        this.alienXCount = 15;
        this.alienYCount = 3;
        this.alienXCoverage = this.canvasService.getWidth()/(this.alienXCount+8);
        this.xPadding = 8*this.alienXCoverage;
        this.alienXPadding = this.alienXCoverage * 0.05;
        this.alienWidth = this.alienXCoverage - 2*this.alienXPadding;
        this.alienHeight = this.alienWidth*(4/3);
        console.log(this.alienWidth, this.alienHeight);
        this.fleet = this.createFleet();
        this.direction = 1;
        this.verticalMove = false;
    }

    private move(){
        this.fleet.forEach(alien => {
            if(alien.getxPosition() + this.alienWidth > this.canvasService.getWidth()){
                this.direction = -1;
                this.verticalMove = true;
                return;
            };
            if(alien.getxPosition() < 0){
                this.direction = 1;
                this.verticalMove = true;
            }
        });
        this.fleet.forEach(alien => {
            alien.moveX(this.direction);
            if(this.verticalMove){
                alien.moveY(this.alienHeight/2);
            }
        });
        this.verticalMove = false;
    }

    private createFleet(): AlienModel[]{
        const fleet: AlienModel[] = [];
        for(let i=0; i<this.alienYCount; i++){
            for(let j=0; j<this.alienXCount; j++){
                const xPos = j*this.alienXCoverage+this.alienXPadding + this.xPadding/2;
                const yPos = i*this.alienHeight;
                fleet.push(new AlienModel(this.alienWidth, this.alienHeight, xPos, yPos));
            }
        }
        return fleet;
    }

    public updateFleet(){
        this.move();
    }

    public renderAlienFleet(){
        this.fleet.forEach(alien => {
            alien.render();
        })
    }
}