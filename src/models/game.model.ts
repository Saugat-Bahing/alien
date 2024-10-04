import { AlienManager } from "../managers/aliens.manager";
import { BulletsManager } from "../managers/bullets.manager";
import { CanvasService } from "../services/canvas.service";
import { BulletModel } from "./bullet.model";
import { ShipModel } from "./ship.mode";

export class GameModel {
    private bullets: BulletModel[];
    private ship: ShipModel;
    private alienManager: AlienManager;

    constructor(){
        this.bullets = [];
        this.ship = new ShipModel(this.bullets);
        this.alienManager = new AlienManager();
    }

    async start(){
        while(true){
            await this.sleep(15);
            CanvasService.getInstance().clearCanvas();
            this.renderBullets();
            this.ship.update();
            this.ship.render();
            this.alienManager.updateFleet();
            this.alienManager.renderAlienFleet();
        }
    }

    private renderBullets(){
        const bullets = BulletsManager.getInstance().getBullets();
        bullets.forEach(bullet => bullet.render());
    }

    private sleep(milliseconds: number){
        return new Promise((res) => {
            setTimeout(() => res(true), milliseconds);
        });
    }
}