import { BulletModel } from "../models/bullet.model";
import { Helper } from "../uitls/helper";

export class BulletsManager {
    private bulletsContaner: BulletModel[];
    private static instance: BulletsManager;

    private constructor(){
        this.bulletsContaner = [];
    }

    public static getInstance(){
        if(Helper.isNullOrUndefined(this.instance)){
            this.instance = new BulletsManager();
        }
        return this.instance;
    }

    public addBullet(xPos: number){
        this.bulletsContaner.push(new BulletModel(xPos + 27, this.destroyBullet));
    }

    public getBullets(): BulletModel[]{
        // console.log(this.bulletsContaner, "container");
        return this.bulletsContaner;
    }

    public removerBullet(bullet: BulletModel){

    }

    private destroyBullet(bullet: BulletModel){
        console.log("con", this.bulletsContaner);
        const manager: BulletsManager = BulletsManager.getInstance();
        const container = manager.getBullets();
        const ind = container.indexOf(bullet);
        container.splice(ind, 1);
        console.log("destroyed", ind);
    }
}