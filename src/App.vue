<template>
 
  <router-view></router-view>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup(){}
});
</script>

<style lang="scss">
@import '@/style/variables.scss';
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
height: 100vh;
max-height: 100vh;
width: 100vw;
display: flex;
background-color: $background;
}
</style>
