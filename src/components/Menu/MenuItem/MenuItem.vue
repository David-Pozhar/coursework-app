<template>
    <div class="menu_item">

        <img v-if="product_data.imageUrl" :src="product_data.imageUrl" alt="img">
        <img v-else src="" alt="img">
        <p class="menu_item_name">{{ product_data.title }}</p>
        <p class="menu_item_desc">{{ product_data.description }}</p>
        <p class="menu_item_price">{{ product_data.price }}</p>

        <button 
            class="add_to_cart_btn"
            @click="addToCart"
        >Add to cart
        </button>
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
    .menu_item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 #e0e0e0;
        margin: 10px;
    }
</style>