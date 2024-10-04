import { BulletModel } from "./models/bullet.model";
import { GameModel } from "./models/game.model";
import { ShipModel } from "./models/ship.mode";
import { CanvasService } from "./services/canvas.service";
import { KeyListner } from "./services/keylistner.service";
import { SpriteService } from "./services/sprites.services";
import { Helper } from "./uitls/helper";

console.log("Starting app...");

const CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
if(!CANVAS){
    throw new Error("No canvas element found");
}
else {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}

async function main(){
    const canvasEle = document.getElementById("canvas");
    if(Helper.isNullOrUndefined(canvasEle)){
        console.error("Canvas element not found");
        return;
    }
    const canvasService = CanvasService.getInstance()
    canvasService.initialize(canvasEle as HTMLCanvasElement);
    KeyListner.initialize();
    await SpriteService.getInstance().loadSprites();
    const game = new GameModel();
    await game.start();
    // while(true){
    //     await(sleep(15));
    //     canvasService.clearCanvas();
    //     shipModel.render();
    // }
    // canvasService.clearCanvas();
}

function sleep(milliseconds: number){
    return new Promise((res) => {
        setTimeout(() => res(true), milliseconds);
    })
}


main();