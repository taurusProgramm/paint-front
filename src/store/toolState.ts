import { defineStore } from 'pinia'
import Tool from '@/tools/tool'
interface ITool{
    tool: Tool
}
const canvas = document.createElement('canvas');
const socket = new WebSocket('ws://192.168.0.101:5000/')

export const useToolStore = defineStore('toolStore', {
    state: ():ITool => {
        return {
            tool: new Tool(canvas, socket, ''),
        }
    },
    actions: {
        setTool(tool:any){
            this.tool = tool
        },
        setFillColor(color:string){
            this.tool.fillColor = color;
        },
        setStrokeColor(color:string){
            this.tool.strokeColor = color;
        },
        setLineWidth(width:number){
            this.tool.lineWidth = width;
        },
    }
})