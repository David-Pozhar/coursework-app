<template>
    <div class="p-4 m-4 rounded-lg bg-slate-50">
        <div class="flex flex-col items-center justify-between">
            <div class="w-full flex items-center justify-center">
                <img v-if="product_data.imageUrl" :src="product_data.imageUrl" alt="img" class="w-40 h-40 rounded-xl object-covers">
                <img v-else src="" alt="img">
            </div>

            <p class="text-lg font-bold text-gray-900">{{ product_data.title }}</p>
            <p class="text-gray-600 mt-2">{{ product_data.description }}</p>
            <p class="text-gray-900 font-semibold mt-2">Price: {{ product_data.price }}</p>

            <button class="w-full flex items-center justify-center mt-2 px-4 py-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold"
                    @click="addToCart"
                >
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { IDish } from '@/models/IDish';

    export default defineComponent({
        name: 'MenuItem',
        props: {
            product_data: {
                type: Object as () => IDish,
                default: () => ({})
            }
        },
        methods: {
            addToCart(): void {
                this.$emit('addToCart', this.product_data);
            }
        },
        data() {
            return {};
        }
    });
</script>

<style>

</style>