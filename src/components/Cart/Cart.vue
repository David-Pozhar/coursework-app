<template>
    <Header />

    <div class="bg-gray-100 px-4 py-8">
        <router-link :to="{ name: 'home' }">
            <div class="text-gray-500 hover:text-gray-700 cursor-pointer mb-4">
                Back to Menu
            </div>
        </router-link>

        <h1 class="flex items-center justify-center text-3xl font-bold mb-6">Cart</h1>

        <CartItem
            v-for="(item, index) in CART"
            :key="item._id"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @incrementQuantity="incrementQuantity(index)"
            @decrementQuantity="decrementQuantity(index)"
        />

        <div class="cart_total bg-white rounded-lg shadow-md p-4 flex items-center justify-between mt-6">
            <p class="total_amount text-lg font-semibold">Total:</p>
            <p class="text-lg font-semibold">{{ getTotalCost }}</p>
        </div>

        <div class="flex justify-center items-center mt-8">
            <router-link to="/checkout">
                <button class="w-60 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-xl"
                        :disabled="!CART.length">
                    Checkout
                </button>
            </router-link>
        </div>
    </div>
  </template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import CartItem from './CartItem.vue'
    import { ICart } from '@/models/ICart';
    import { mapActions, mapGetters } from 'vuex';
    import Header from '../Home/Header/Header.vue';


    export default defineComponent({
        name: 'Cart',
        components: {
            CartItem, Header
        }, 
        methods: {
            ...mapActions('cart', [
                'DELETE_FROM_CART',
                'INCREMENT_QUANTITY',
                'DECREMENT_QUANTITY'

            ]),
            deleteFromCart(index: number) {
                this.DELETE_FROM_CART(index);
            },
            incrementQuantity(index: number) {
                this.INCREMENT_QUANTITY(index);
            },
            decrementQuantity(index: number) {
                this.DECREMENT_QUANTITY(index);
            }
        },
        computed: {
            ...mapGetters('cart', [
                'CART'
            ]) as {CART: () => ICart[]},

            getTotalCost(): number {
                if (this.CART.length) {
                    let totalCost = 0;

                    this.CART.forEach((element: ICart) => {
                    totalCost += element.price * element.quantity
                    });

                    return totalCost;
                } else {
                    return 0;
                }

                
            }
        }
    });
</script>

<style>
   
</style>