<template>
    <div class="main_wrapper">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import './Main.css'
    export default defineComponent({
        name: 'Main',
        components: {},
        data() {
            return {}
        },
    });
</script>

<style>

</style>