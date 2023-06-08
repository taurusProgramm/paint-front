import Tool from "./tool";

export default class Brush extends Tool {
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
    mouseDownHadler(event: MouseEvent){
        this.mouseDown = true;
        const target = event.target as HTMLCanvasElement
        this.ctx.beginPath()
        this.ctx.moveTo(event.pageX - target.offsetLeft, event.pageY - target.offsetTop)
    }
    mouseUpHadler(event: MouseEvent ){
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessiondId,
            figure: {
                type: 'finish',
            }
        }))
    }
    mouseMoveHadler(event: MouseEvent){
        const target = event.target as HTMLCanvasElement
        if(this.mouseDown){
            // this.draw(event.pageX - target.offsetLeft, event.pageY - target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessiondId,
                figure: {
                    type: 'brush',
                    x: event.pageX - target.offsetLeft,
                    y: event.pageY - target.offsetTop
                }
            }))
        }
    }

   static draw(ctx: CanvasRenderingContext2D  ,x:number, y:number){
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}