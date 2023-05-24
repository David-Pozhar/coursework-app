<template>
    <div class="bg-black">
        <div class="poster_container w-full md:w-2/3 px-7 mx-auto relative flex items-center justify-around">

            <div class="poster_description">
                <h2 class="text-4xl font-bold text-white mb-6">
                    Fluffy stacks of perfection - order now!
                </h2>
                <p class="py-2 text-lg text-yellow-400 font-normal">
                    Get Started Today!
                </p>

                <div class="home_btn">
                    <!-- <button :disabled="true" class="px-4 py-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold">
                        Order Now
                    </button> -->
                    <!-- <router-link to="/menu" class="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
                        See Menu
                    </router-link> -->
                </div>
            </div>

            <div class="poster_img w-full md:w-2/3 flex justify-around">
                <img src='../../../assets/img/pancake-home4.png' alt="pancake" class="max-h-96" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Poster',
    });
</script>

<style></style> 