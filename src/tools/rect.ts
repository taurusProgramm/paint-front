import Tool from "./tool";

export default class Rect extends Tool {
    private mouseDown: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    private saved: string = '';
    private width: number = 0;
    private height: number = 0;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket , id:string){
        super(canvas, socket, id);
        this.listen();
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHadler.bind(this)
        this.canvas.onmouseup = this.mouseUpHadler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHadler.bind(this)
    }
    mouseUpHadler(event: MouseEvent){
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessiondId,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.ctx.fillStyle
            }
        }))
        
        
    }
    mouseDownHadler(event: MouseEvent){
        this.mouseDown = true;
        const target = event.target as HTMLCanvasElement
        this.ctx.beginPath()
        this.startX  = event.pageX - target.offsetLeft;
        this.startY = event.pageY - target.offsetTop;
        this.saved = this.canvas.toDataURL();
        
    }
    mouseMoveHadler(event: MouseEvent){
        const target = event.target as HTMLCanvasElement
        if(this.mouseDown){
            let currentX  = event.pageX - target.offsetLeft;
            let currentY = event.pageY - target.offsetTop;
            this.width = (currentX - this.startX);
            this.height = (currentY - this.startY);
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x:number, y:number, w: number, h: number){
        const img = document.createElement('img');
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.stroke();
            this.ctx.fill();
        }
       console.log('draw rect');
       
    }

    static staticDraw(ctx: CanvasRenderingContext2D, x:number, y:number, w: number, h: number, color:string){
        ctx.fillStyle = color
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.fill();

    }
}