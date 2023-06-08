export default class Tool {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected socket: WebSocket;
    protected sessiondId: string;

    constructor(canvas:HTMLCanvasElement, socket: WebSocket , id:string){
        this.canvas = canvas;
        this.socket = socket;
        this.sessiondId = id
        this.ctx = canvas.getContext('2d')!;
        this.destroyEvents();

    }
    set fillColor(color:string){
        this.ctx.fillStyle = color;
    }
    set strokeColor(color:string){
        this.ctx.strokeStyle = color;
    }
    set lineWidth(width:number){
        this.ctx.lineWidth = width;
    }
    destroyEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }
}