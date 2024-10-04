export class KeyListner {
    private static initialized: boolean = false;
    private static keyDownCallbacks: Function[] = [];
    private static keyUpCallbacks: Function[] = [];     

    public static initialize(){
        window.addEventListener("keydown", (key) => {
            console.log("KeyDown");
            this.keyDownCallbacks.forEach(callback => {
                callback(key.key);
            });
        });
        window.addEventListener("keyup", (key) => {
            console.log("KeyUp");
            this.keyUpCallbacks.forEach(callback => {
                callback(key.key);
            });
        });
        this.initialized = true; 
    }

    public static registerKeyDown(callback: Function){
        this.keyDownCallbacks.push(callback);
    }

    public static registerKeyUp(callback: Function){
        this.keyUpCallbacks.push(callback);
    }
}