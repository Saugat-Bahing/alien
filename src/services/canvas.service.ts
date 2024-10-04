import { Helper } from "../uitls/helper";

export class CanvasService {
    private static canvas:HTMLCanvasElement;
    private static context:CanvasRenderingContext2D;
    private static instance:CanvasService;
    private backgroundColor: string;

    private constructor(){
        this.backgroundColor = "#000000";
    }

    public static getInstance(): CanvasService{
        if(this.instance == null || typeof(this.instance) == 'undefined'){
            this.instance = new CanvasService();
        }
        return this.instance;
    }

    public initialize(element: HTMLCanvasElement): void{
        CanvasService.canvas = element;
        const ctx = CanvasService.canvas.getContext('2d');
        if(Helper.isNullOrUndefined(ctx)){
            throw new Error("HTML5 canvas not supported");
        }
        CanvasService.canvas.width = window.innerWidth;
        CanvasService.canvas.height = window.innerHeight;
        CanvasService.canvas.style.backgroundColor = this.backgroundColor;
        CanvasService.context = ctx as CanvasRenderingContext2D;
    }

    public getContext(): CanvasRenderingContext2D{
        return CanvasService.context;
    }

    public getbackgroundColor(): string {
        return this.backgroundColor;
    }

    public setbackgroundColor(color: string): void {
        this.backgroundColor = color;
    }

    public getWidth(): number{
        return CanvasService.canvas.width;
    }

    
    public getHeight(): number{
        return CanvasService.canvas.height;
    }

    public clearCanvas(): void {
        CanvasService.context.fillStyle = this.backgroundColor;
        CanvasService.context.fillRect(0, 0, this.getWidth(), this.getHeight());
    }
}