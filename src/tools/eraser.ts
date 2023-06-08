import Tool from "./tool";

export default class Eraser extends Tool {
    protected mouseDown: boolean = false;
    constructor(canvas: HTMLCanvasElement, socket: WebSocket , id:string){
        super(canvas, socket, id);
        this.listen();
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHadler.bind(this)
        this.canvas.onmouseup = this.mouseUpHadler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHadler.bind(this)
    }

    mouseUpHadler(){
        this.mouseDown = false;
    }

    mouseDownHadler(event: MouseEvent){
        this.mouseDown = true;
        const target = event.target as HTMLCanvasElement
        this.ctx.beginPath()
        this.ctx.moveTo(event.pageX - target.offsetLeft, event.pageY - target.offsetTop);
    }
    
    mouseMoveHadler(event: MouseEvent){
        const target = event.target as HTMLCanvasElement
        if(this.mouseDown){
            this.draw(event.pageX - target.offsetLeft, event.pageY - target.offsetTop)
        }
    }

    draw(x:number, y:number){
        this.ctx.strokeStyle = 'white'
        // this.ctx.lineWidth = 20;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        console.log('draw eraser');
        
    }
}

