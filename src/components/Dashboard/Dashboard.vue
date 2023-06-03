<template>
    <div class="min-h-screen bg-gray-100">
        <Header />
        <div class="flex">
            <div class="bg-white w-1/4 shadow-lg p-4">
                <ul class="divide-y divide-gray-200">
                    <router-link to="/dashboard/users" class="flex items-center py-2 hover:bg-gray-200">
                        <li class="flex items-center"> 
                            <i class="fas fa-users text-gray-500 mr-2"></i>
                            <span class="text-gray-800 font-medium">Users</span>
                        </li>
                    </router-link>  
                    <router-link to="/dashboard/categories" class="flex items-center py-2 hover:bg-gray-200">
                        <li class="flex items-center">
                            <i class="fas fa-tags text-gray-500 mr-2"></i>
                            <span class="text-gray-800 font-medium">Categories</span>
                        </li>
                    </router-link>
                    <router-link to="/dashboard/dishes" class="flex items-center py-2 hover:bg-gray-200">
                        <li class="flex items-center"> 
                            <i class="fas fa-users text-gray-500 mr-2"></i>
                            <span class="text-gray-800 font-medium">Dishes</span>
                        </li>
                    </router-link>
                    <router-link to="/dashboard/orders" class="flex items-center py-2 hover:bg-gray-200">
                        <li class="flex items-center"> 
                            <i class="fas fa-users text-gray-500 mr-2"></i>
                            <span class="text-gray-800 font-medium">Orders</span>
                        </li>
                    </router-link>
                </ul>
            </div>
            <div class="flex-grow p-8">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-2xl font-bold mb-4">Dashboard Content</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat aliquet ligula, sed vestibulum mauris pellentesque in. Duis mattis mauris auctor ex accumsan faucibus. Vivamus pharetra rhoncus felis, vitae efficitur ipsum consectetur id.</p>
                    <p>Integer commodo, enim non consectetur varius, ligula metus euismod erat, non porttitor enim mi non ante. Suspendisse non lectus vitae leo pharetra ultrices. Suspendisse fringilla, purus id fringilla interdum, neque metus pharetra risus, ut posuere nunc massa in erat.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from '../Home/Header/Header.vue';

    export default defineComponent({
        name: 'Dashboard',
        components: {Header},
    });
</script>

<style>

</style>