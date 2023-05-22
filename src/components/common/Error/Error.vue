<template>
    <ul v-if="errors && errors.length" class="flex flex-col items-center justify-center mt-4 text-red-500 text-sm">
                    <li 
                        v-for="(error,index) in errors" 
                        :key="index">
                        {{ error }}
                    </li>
    </ul>
</template>

<script lang="ts"> 
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Error',
        props: {
            errors: {
                type: Array,
            }
        },
    })
</script>

<style>

</style>