<template>
     <div class="w-1/3 text-white bg-gradient-to-t from-slate-600 to-transparent text-center">
        <img v-if="product_data.imageUrl" :src="imageHostName + product_data.imageUrl" :alt="product_data.title" class="mx-auto h-40 "/>
        <img v-else src="../../../assets/img/pancake-raspberry.png" :alt="product_data.title" class="mx-auto w-40 h-40 "/>
        <h2 class="pb-2 text-lg">{{ product_data.title }}</h2>
        <p class="mb-2 h-20 line-clamp-4">{{ product_data.description }}</p>
        <div class="flex justify-end">
            <button class="bg-yellow-400 hover:bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-lg"
                    @click="addProductToCart"
            >
                <span>
                    +
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { IMAGE_HOST_NAME } from '@/config';
    import { IDish } from '@/models/IDish';
    import { defineComponent } from 'vue';
    import { mapActions } from 'vuex';

    export default defineComponent({
        name: 'CarouselItem',
        props: {
            product_data: {
                type: Object as () => IDish,
                default: () => ({}) 
            },
        },
        data() {
            return {
                imageHostName: IMAGE_HOST_NAME,
            }
        },
        methods: {
            ...mapActions('cart',[
                'ADD_TO_CART',
            ]),
            addProductToCart() {
                this.ADD_TO_CART(this.product_data);
            }
        }
    })
</script>

<style>

</style>