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
                </div>
            </div>

            <div class="poster_img w-full md:w-2/3 flex justify-around">
                <img src='../../../assets/img/pancake-strawberry.png' alt="pancake" class="max-h-96" />
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