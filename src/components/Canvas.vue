<template>

    <div class="canvas">
        <canvas width="600" height="400" ref="canvasRef" @mousedown="handlerMouseDown" @mouseup="handlerMouseUp"/>
        
        <div class="box-users" v-if="users.length !== 0">
            <div class="user" v-for="i in users">{{ i }}</div>
        </div>
        <div class="btnUrl" @click="copyUrl">
            Поделиться ссылкой
            <div class="message" v-if="messageSeen"> Ссылка скопирована в буфер обмена</div>
        </div>

    </div>    
    
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {useCanvasStore} from '@/store/canvasState';
import {useToolStore} from '@/store/toolState';
import Rect from '@/tools/rect';
import Brush from '@/tools/brush'
import {useRoute} from 'vue-router'
import axios from 'axios'

export default defineComponent({
    name: 'Canvas',
    setup(){
        const canvasRef = ref()
        const users = ref<string[]>([])
        const messageSeen = ref(false)
        const canvasStore = useCanvasStore();
        const toolStore = useToolStore();
        const route = useRoute();

        function drawHandler(msg:any){
            const figure = msg.figure
            const ctx = canvasRef.value.getContext('2d')!
            switch(figure.type){
                case 'brush':
                    Brush.draw(ctx, figure.x, figure.y)
                break
                case 'rect':
                    Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
                case 'finish':
                    ctx.beginPath()
                break
            }
        }

        const handlerMouseDown = () => {
            canvasStore.pushToUndo(canvasRef.value.toDataURL())
        }

        const handlerMouseUp = () => {
            // axios.post(`http://localhost:5000/image?id=${route.params.id}`, {img: canvasRef.value.toDataURL()})
            // .then(response => console.log(response.data))
        }

        function copyUrl() {
            const url = window.location.toString()
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url)
                console.log(1);
                
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                messageSeen.value = true
                setTimeout(()=>{
                    messageSeen.value = false
                }, 3000)
                console.log(2);
            }
        }

        onMounted(() => {
            canvasStore.setCanvas(canvasRef.value);
            const socket = new WebSocket('ws://88.201.178.202:81/')
            canvasStore.setSocket(socket)
            canvasStore.setSessionId(String(route.params.id))
            toolStore.setTool(new Brush(canvasRef.value, socket, String(route.params.id)));

            let ctx = canvasRef.value.getContext('2d')
            // axios.get(`http://localhost:5000/image?id=${route.params.id}`)
            // .then(response => {
            //     const img = new Image()
            //     img.src = response.data
            //     img.onload = () => {
            //         ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
            //         ctx.drawImage(img, 0, 0, canvasRef.value.width, canvasRef.value.height)
            //     }
            // })

            socket.onopen = ()=>{
                socket.send(JSON.stringify({
                    id: route.params.id,
                    username: canvasStore.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event)=> {
                const msg = JSON.parse(event.data) 
                switch(msg.method){
                    case 'connection':
                        if(canvasStore.username !== msg.username) {
                            users.value.push(`Пользователь ${msg.username} подключился`)
                        }
                        break;
                    case 'draw':
                        drawHandler(msg)
                        break;
                }          
                
            };
            
        });
    return {
        canvasRef,
        handlerMouseDown,
        users,
        copyUrl,
        messageSeen,
        handlerMouseUp
    }
    }
})
</script>

<style lang="scss">
@import '@/style/variables.scss';
.canvas{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-users{
        position: absolute;
        top: 100px;
        left: 10px;
        // height: 100px;
        max-width: 300px;
        border-radius: 20px;
        background-color: white;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        padding: 10px;
        .user{
            font-size: 16px;
            font-weight: 400;
            &::before{
                content: '';
                background-color: rgb(9, 190, 9);
                height: 10px;
                width: 10px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
            }
        }
    }
    .btnUrl{
        position: absolute;
        top: 100px;
        right: 20px;
        padding: 12px;
        background-color: grey;
        border-radius: 20px;
        cursor: pointer;
        .message{
            position: absolute;
            top: 50px;
        }
    }
}

canvas {
    border: 1px solid black;
    background-color: white;
}
</style>