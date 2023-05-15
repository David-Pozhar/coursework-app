<template>
    <Header />
    <div class="w-full h-full mt-8">
        <ul>
            <li 
                class="flex w-full justify-between text-black-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <router-link to="/dashboard/users">Users</router-link>
            </li>
            <li 
                class="flex w-full justify-between text-black-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <router-link to="/dashboard/categories">Categories</router-link>
            </li>
            <li 
                class="flex w-full justify-between text-black-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <router-link to="/dashboard/dishes">Dishes</router-link>
            </li>
            <li 
                class="flex w-full justify-between text-black-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <router-link to="/dashboard/orders">Orders</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from '../Home/Header/Header.vue';

    export default defineComponent({
        name: 'Dashboard',
        components: {Header},
        props: {},
        data() {
            return {}
        }
    });
</script>

<style>

</style>