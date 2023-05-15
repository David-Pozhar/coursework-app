<template>
    <div class="cart_wrapper">
        <router-link :to="{name: 'menu'}">
            <div class="back_to_menu">Back to menu</div>
        </router-link>

        <h1>Cart</h1>
        <CartItem
            v-for="(item, index) in CART"
            :key="item.id" 
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @incrementQuantity="incrementQuantity(index)"
            @decrementQuantity="decrementQuantity(index)"
        />

        <div class="cart_total">
            <p class="total_amount">Total: </p>
            <p>{{ getTotalCost }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import CartItem from './CartItem.vue'
    import { ICart } from '@/models/ICart';
    import { mapActions, mapGetters } from 'vuex';


    export default defineComponent({
        name: 'Cart',
        components: {
            CartItem
        }, 
        methods: {
            ...mapActions([
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
            ...mapGetters([
                'CART'
            ]),

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
    .back_to_menu {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 16px;
        border: 1px solid grey;
    }

    .cart_total {
        margin-top: 50px;
        display: flex;
        background-color: #7CFC00;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 16px;
        justify-content: center;
        color: white;
        position: fixed;
    }
    .total_amount {
        margin-right: 16px;
    }
</style>