<template>
    <ToolBar/>
    <SettingsBar/>
    <template v-if="!isSeenModal">
        <Canvas/>
    </template>
    
    <div class="modal" v-if="isSeenModal">
        <div class="box">
            <label for="name" style="font-size: 25px; letter-spacing: 1px;">Введите имя </label>
            <input type="text" name="" id="name" ref="input" v-model="username">
            <div class="btn" @click="submit">Войти</div>
        </div>
    </div>
   </template>
   
   <script lang="ts">
   import { defineComponent, onMounted, ref } from 'vue';
   import ToolBar from '@/components/ToolBar.vue';
   import SettingsBar from '@/components/SettingsBar.vue';
   import Canvas from '@/components/Canvas.vue'
   import {useCanvasStore} from '@/store/canvasState'
   
   
   export default defineComponent({
     name: 'Main',
     components: {
       ToolBar,
       SettingsBar,
       Canvas
     },
   
     setup(){
        const input = ref();
        const username = ref('');
        const isSeenModal = ref(true)
        const canvasStore = useCanvasStore()
        const submit = () => {
            if(username.value.length === 0){
                alert('Дурак? Имя введи')
            } else{
                canvasStore.setUserName(username.value)  
                isSeenModal.value = false
            }
        }
        onMounted(() => {
           if(isSeenModal.value){
            input.value.focus()
           }
        })
        return{
            input,
            username,
            submit,
            isSeenModal,
            
        }
     }
   });
   </script>

<style lang="scss" scoped>
.modal{
    z-index: 100;
    position: absolute;
    inset: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
        height: 500px;
        width: 500px;
        background-color: white;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .btn{
            padding: 20px 40px;
            background-color: rgb(15, 122, 87);
            border-radius: 15px;
            color: bisque;
            font-size: 20px;
            cursor: pointer;
        }
        input{
            display: block;
            padding: 20px;
            border-radius: 20px;
            font-size: 20px;
            margin: 10px 0;
        }
    }
}
</style>