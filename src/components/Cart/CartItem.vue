<template>
    <div class="flex items-center border-b border-gray-200 py-4">
        <img class="w-16 h-16 object-cover rounded-md mr-4"
            :src="imageHostName + cart_item_data.imageUrl"
            :alt="cart_item_data.title"
        />
        <div class="flex-1">
            <p class="text-xl font-semibold text-gray-800 mb-2">
                {{ cart_item_data.title }}
            </p>
            <p class="text-gray-600 mb-2">
                {{ cart_item_data.description }}
            </p>
            <p class="text-gray-800 font-semibold">
                {{ cart_item_data.price }}
            </p>
            <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-2"
                @click="deleteFromCart"
            >
                Delete
            </button>
        </div>
        <div class="flex items-center">
            <span class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded cursor-pointer w-10 h-10 text-center"
                    @click="decrementQuantity"
            >
                -
            </span>
            <p class="text-gray-800 font-semibold mx-4">Quantity: {{ cart_item_data.quantity }}</p>
            <span class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded cursor-pointer w-10 h-10 text-center"
                    @click="incrementQuantity"
            >
                +
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { IMAGE_HOST_NAME } from '@/config';
    import { defineComponent } from 'vue';
    import { ICart } from '@/models/ICart';
    
    export default defineComponent({
        name: 'CartItem',
        props: {
            cart_item_data: {
                type: Object as () => ICart,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                imageHostName: IMAGE_HOST_NAME,
            }
        },
        methods: {
            deleteFromCart() {
                this.$emit('deleteFromCart')
            },
            incrementQuantity() {
                this.$emit('incrementQuantity')
            },
            decrementQuantity() {
                this.$emit('decrementQuantity')
            }
        },
        mounted(this: { cart_item_data: ICart }): void {
            const cartItemData = this.cart_item_data;
            cartItemData.quantity = 1;
        }
        
    });
</script>

<style>
    
</style>