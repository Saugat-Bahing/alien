import { BulletsManager } from "../managers/bullets.manager";
import { CanvasService } from "../services/canvas.service";
import { KeyListner } from "../services/keylistner.service";
import { SpriteService } from "../services/sprites.services";
import { Coordinate } from "../types/types.def";
import { BulletModel } from "./bullet.model";

export class ShipModel {
    private xPosition: number;
    private yPosition: number;
    private canvasService:CanvasService;
    private context: CanvasRenderingContext2D;
    private gunSprite;
    private height:number;
    private width: number;
    private movingLeft:boolean;
    private movingRight:boolean;
    private shootingBullet: boolean;
    private velocity: number;
    private readonly bullets: BulletModel[];
    private readonly bulletsManager: BulletsManager;

    constructor(bullets: BulletModel[]){
        this.height = 70;
        this.width = 56;
        this.canvasService = CanvasService.getInstance();
        this.context = this.canvasService.getContext();
        this.yPosition = this.canvasService.getHeight() - this.height;
        this.xPosition = (this.canvasService.getWidth() - this.width)/2;
        this.gunSprite = SpriteService.getInstance().getSprite("ship");
        this.movingLeft = false;
        this.movingRight = false;
        this.shootingBullet = false;
        this.velocity = 10;
        this.bullets = bullets;
        this.bulletsManager = BulletsManager.getInstance();


        KeyListner.registerKeyDown((key: string) => {
            console.log(key);
            if(key === 'ArrowLeft'){
                console.log("Left down");
                this.movingLeft = true;
            }
            else if(key === 'ArrowRight'){
                console.log("Right down");
                this.movingRight = true;
            }
            else if(key === ' '){
                console.log("Space down");
                this.shootingBullet = true;
            }
        });
        KeyListner.registerKeyUp((key: string) => {
            if(key === 'ArrowLeft'){
                console.log("Left up");
                this.movingLeft = false;
            }
            else if(key === 'ArrowRight'){
                console.log("Right up");
                this.movingRight = false;
            }
            else if(key === ' '){
                console.log("Space up");
                this.shootingBullet = false;
            }
        });
    }

    public shootBullet(){
        return this.shootBullet;
    }

    public update(){
        if(this.movingLeft && (this.xPosition - this.velocity) > 0){
            this.xPosition -= this.velocity;
        }
        if(this.movingRight && (this.xPosition + this.velocity + this.width) < this.canvasService.getWidth()){
            this.xPosition += this.velocity;
        }     
        if(this.shootingBullet){
            this.bulletsManager.addBullet(this.xPosition);
        } 
    }

    public render() {
        this.context.drawImage(this.gunSprite, this.xPosition, this.yPosition, this.width, this.height);
        this.context.beginPath();
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 2;
        this.context.strokeRect(this.xPosition, this.yPosition, this.width, this.height);
    }
}