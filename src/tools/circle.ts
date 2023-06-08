import Tool from "./tool";

export default class Circle extends Tool {
    private mouseDown: boolean = false;
    private centerX: number = 0;
    private centerY: number = 0;
    private saved: string = '';

    constructor(canvas: HTMLCanvasElement, socket: WebSocket , id:string){
        super(canvas, socket , id);
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
        this.centerX  = event.pageX - target.offsetLeft;
        this.centerY = event.pageY - target.offsetTop;
        this.saved = this.canvas.toDataURL();
        
    }
    mouseMoveHadler(event: MouseEvent){
        const target = event.target as HTMLCanvasElement
        if(this.mouseDown){
            let currentX  = event.pageX - target.offsetLeft;
            let currentY = event.pageY - target.offsetTop;
            let cathetH = currentX - this.centerX;
            let cathetV = currentY - this.centerY;
            let radius = Math.sqrt(cathetH ** 2 + cathetV ** 2);
            this.draw(this.centerX, this.centerY, radius)
        }
    }

    draw(x:number, y:number, radius: number){
        const img = document.createElement('img');
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }
        console.log('draw circle');
    }
}