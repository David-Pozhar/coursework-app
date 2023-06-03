<template>
    <Header />
    <div class="p-4 pt-10 m-4 rounded-lg bg-slate-50">
        <div class="flex flex-col items-center justify-between">
                <div class="w-80 h-auto flex items-center justify-center">
                    <div v-if="isFetching" class="flex justify-center items-center">
                        <img src="../../../assets/img/preloader.gif" alt="Loading...">
                    </div>
                    <img v-else-if="dish.imageUrl" :src="imageHostName + dish.imageUrl" alt="img" class="h-40 rounded-xl object-covers">
                    <img v-else src="../../../assets/img/pancake-blueberry.png" alt="img">
                </div>
                <p class="flex items-center justify-center text-2xl font-bold text-gray-900">{{ dish.title }}</p>
            <p class="text-gray-600 mt-2">{{ dish.description }}</p>
            <p class="text-gray-900 font-semibold mt-2">Price: {{ dish.price }}</p>

            <button class="w-1/3 flex items-center justify-center mt-2 px-4 py-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold"
                    @click="addToCart"
                >
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from '@/components/Home/Header/Header.vue';
    import { mapActions } from 'vuex';
    import { IDish } from '@/models/IDish';
    import { IMAGE_HOST_NAME } from '@/config';

    export default defineComponent({
        name:'DishInfo',
        components: {Header},
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dish: {} as IDish,
                imageHostName: IMAGE_HOST_NAME,
                isFetching: true,
            }
        },
        methods: {
            ...mapActions([
                'ADD_TO_CART',
            ]),
            ...mapActions('dishes',[
                'GET_ONE_DISH'
            ]),
            addToCart() {
                this.ADD_TO_CART(this.dish);
            }
        },
        async mounted() {
            const dish = await this.GET_ONE_DISH(this.id);
            if (dish) {
                this.dish = dish;
                this.isFetching = false;
            }
        }
    })
</script>

<style>

</style>