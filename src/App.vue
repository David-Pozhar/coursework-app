<template>
  <div class="app">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Main from './components/Main.vue'


export default defineComponent({
  name: 'App',
  components: {
    Main
  }
});
</script>

<style>

</style>
