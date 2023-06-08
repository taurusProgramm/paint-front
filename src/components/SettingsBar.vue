<template>

    <div class="settings">
        <label for="line-width">Толщина линии</label>
        <input 
        @input="handleWidthChange"
        type="number" 
        min="1" max="50" value="1" 
        id="line-width" 
        style="margin: 0 10px;">
        <label for="color">Цвет обводки</label>
        <input type="color" name="" id="color" style="margin: 0 10px;" @change="handleStrokeColorChange">
    </div>    
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useToolStore} from '@/store/toolState'

export default defineComponent({
    name: 'SettingsBar',
    setup(){
        const toolStore = useToolStore();
        function handleWidthChange(event: Event){
            const target = event.target as HTMLInputElement;
            toolStore.setLineWidth(+target.value)
        }
        function handleStrokeColorChange(event: Event){
            const target = event.target as HTMLInputElement;
            toolStore.setStrokeColor(target.value)
        }


        return{
            handleWidthChange,
            handleStrokeColorChange
        }
    }
})
</script>

<style lang="scss">
@import '@/style/variables.scss';
.settings{
position: absolute;
top: $toolbar-height;
width: 100%;
height: $toolbar-height;
background-color: white;
display: flex;
align-items: center;
box-shadow: 0 4px 5px grey;
}
</style>