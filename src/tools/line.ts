import Tool from "./tool";

export default class Line extends Tool {
    protected mouseDown: boolean = false;
    protected startX: number = 0;
    protected startY: number = 0;
    private saved: string = '';
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
        
    }

    mouseDownHadler(event: MouseEvent){
        this.mouseDown = true;
        const target = event.target as HTMLCanvasElement;
        this.startX = event.pageX - target.offsetLeft;
        this.startY = event.pageY - target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.saved = this.canvas.toDataURL();
    }
    
    mouseMoveHadler(event: MouseEvent){
        const target = event.target as HTMLCanvasElement
        if(this.mouseDown){
            this.draw(event.pageX - target.offsetLeft, event.pageY - target.offsetTop)
        }
    }

    draw(x:number, y:number){
        const img = document.createElement('img');
        img.src = this.saved;
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY )
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }  
    }
    
}