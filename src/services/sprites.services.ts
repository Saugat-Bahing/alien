import { Helper } from "../uitls/helper";

export class SpriteService {
    private static instance:SpriteService;
    private sprites:Map<string, HTMLImageElement>

    private constructor(){
        this.sprites = new Map();    
    }

    public static getInstance(): SpriteService{
        if(Helper.isNullOrUndefined(this.instance)){
            this.instance = new SpriteService();
        };
        return this.instance;
    }

    public async loadSprites(){
        const shipSprite = this.loadSprite("./asserts/ship.png");
        const alienSprite = this.loadSprite("./asserts/alien.png");
        const sprites = await Promise.all([shipSprite, alienSprite]);
        console.log(sprites);
        this.sprites.set("ship", sprites[0]);
        this.sprites.set("alien", sprites[1]);
    }

    public getSprite(name: string): HTMLImageElement {
        const sprite = this.sprites.get(name);
        if(Helper.isNullOrUndefined(sprite)){
            throw new Error("Sprite is not present.");
        }
        return sprite as HTMLImageElement;
    }

    private loadSprite(src: string): Promise<HTMLImageElement>{
        return new Promise((res) => {
            const img = new Image();
            img.onload = () => res(img);
            img.src = src;
        })
    }
}