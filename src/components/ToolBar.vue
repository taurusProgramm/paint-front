<template>

    <div class="toolbar">
        <button class="toolbar__btn brush" @click="pickBrush"></button>
        <button class="toolbar__btn rect" @click="pickRect"></button>
        <button class="toolbar__btn circle" @click="pickCircle"></button>
        <button class="toolbar__btn eraser" @click="pickEraser"></button>
        <button class="toolbar__btn line" @click="pickLine"></button>
        <input type="color" style="margin-left: 10px;" @input="changeColor">
        <button class="toolbar__btn undo" @click="undo"></button>
        <button class="toolbar__btn redo" @click="redo"></button>
        <button class="toolbar__btn save"></button>
    </div>    
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useToolStore} from '@/store/toolState';
import {useCanvasStore} from '@/store/canvasState';
import Brush from '@/tools/brush';
import Rect from '@/tools/rect';
import Circle from '@/tools/circle';
import Line from '@/tools/line';
import Eraser from '@/tools/eraser';

export default defineComponent({
    name: 'ToolBar',
    setup(){
        const toolStore = useToolStore();
        const canvasStore = useCanvasStore();

        const pickBrush = ()=>{
            toolStore.setTool(new Brush(canvasStore.canvas!, canvasStore.socket!, canvasStore.sessionId));
            console.log('выбрана кисть');
        }
        const pickRect = ()=> {
            toolStore.setTool(new Rect(canvasStore.canvas!, canvasStore.socket!, canvasStore.sessionId));
            console.log('выбран прямоугольник');
        }
        const pickCircle = ()=> {
            toolStore.setTool(new Circle(canvasStore.canvas!, canvasStore.socket!, canvasStore.sessionId));
            console.log('выбран круг');
        }
        const pickEraser = ()=> {
            toolStore.setTool(new Eraser(canvasStore.canvas!, canvasStore.socket!, canvasStore.sessionId))
            console.log('выбран ластик');
        }
        const pickLine = ()=> {
            toolStore.setTool(new Line(canvasStore.canvas!, canvasStore.socket!, canvasStore.sessionId));
            console.log('выбрана прямая линия');
        }
        const changeColor = (event:Event)=>{
            const target = event.target as HTMLInputElement
            toolStore.setStrokeColor(target.value)
            toolStore.setFillColor(target.value)
            
        }
        const undo = ()=>{
            canvasStore.undo()
        }
        const redo = ()=>{
            canvasStore.redo()
        }
        return {
            pickBrush,
            pickRect,
            pickCircle,
            pickEraser,
            pickLine,
            changeColor,
            undo,
            redo
        }
    }
})
</script>

<style lang="scss">
@import '@/style/variables.scss';
.toolbar{
position: absolute;
width: 100%;
height: $toolbar-height;
background-color: white;
display: flex;
align-items: center;
box-shadow: 0 4px 5px grey;
z-index: 99;
&__btn{
    border: none;
    outline: none;
    height: 25px;
    width: 25px;
    cursor: pointer;
    background-size: cover;
    margin-left: 10px;
}
.brush{
    background: url('@/assets/img/brush.svg') no-repeat center center;
}
.rect{
    background: url('@/assets/img/rect.svg') no-repeat center center;
}
.circle{
    background: url('@/assets/img/circle.svg') no-repeat center center;
}
.eraser{
    background: url('@/assets/img/eraser.svg') no-repeat center center;
}
.line{
    background: url('@/assets/img/line.svg') no-repeat center center;
}
.undo{
    margin-left: auto;
    background: url('@/assets/img/undo.svg') no-repeat center center;
}
.redo{
    background: url('@/assets/img/redo.svg') no-repeat center center;
}
.save{
    margin-right: 10px;
    background: url('@/assets/img/save.svg') no-repeat center center;
}
}
</style>