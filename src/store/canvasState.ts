import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvasStore', {
    state: () => {
        return {
            canvas: null as HTMLCanvasElement | null,
            undoList: [] as string[],
            redoList: [] as string[],
            username: '',
            socket: null,
            sessionId: ''

        }
    },
    actions: {
        setUserName(username: string){
            this.username = username
        },
        setSocket(socket: any){
            this.socket = socket
        },
        setSessionId(sessionId: string){
            this.sessionId = sessionId
        },
        setCanvas(canvas:any){
            this.canvas = canvas;
        },
        pushToUndo(data:string){
            this.undoList.push(data)
        },
        pushToRedo(data: string){
            this.redoList.push(data)
        },
        undo(){
            let ctx = this.canvas!.getContext('2d')!
            if(this.undoList.length > 0){
                let dataUrl = this.undoList.pop()! 
                this.redoList.push(this.canvas!.toDataURL())
                let img = document.createElement('img')
                img.src = dataUrl
                img.onload = () => {
                    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
                    ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
                }
            } else {
                ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
            }
        },
        redo(){
            let ctx = this.canvas!.getContext('2d')!
            if(this.redoList.length > 0){
                let dataUrl = this.redoList.pop()! 
                this.undoList.push(this.canvas!.toDataURL())
                let img = document.createElement('img')
                img.src = dataUrl
                img.onload = () => {
                    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
                    ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
                }
            } 
        },

    }
})