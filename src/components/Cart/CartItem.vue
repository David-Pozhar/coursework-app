<template>
    <div class="cart-item">
        <img src="" alt="img">
        <div class="cart-item-info">
            <p class="menu_item_name">{{ cart_item_data.title }}</p>
            <p class="menu_item_desc">{{ cart_item_data.description }}</p>
            <p class="menu_item_price">{{ cart_item_data.price }}</p>
            <button
                @click="deleteFromCart"
            >Delete
            </button>
        </div>

        <div class="cart-item-quantity">
            <span class="quantity_btn" @click="incrementQuantity">+</span>
            <p>Quantity: {{ cart_item_data.quantity }}</p>
            <span class="quantity_btn" @click="decrementQuantity">-</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({
        name: 'CartItem',
        props: {
            cart_item_data: {
                type: Object,
                default() {
                    return {}
                }
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
        mounted(): void {
            const cartItemData = this.cart_item_data;
	        cartItemData.quantity = 1;
        }
        
    });
</script>

<style>
    .cart-item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: 16px;
        margin-bottom: 16px;
    }

    .quantity_btn {
        cursor: pointer;
    }
</style>