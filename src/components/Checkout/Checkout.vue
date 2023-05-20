<template>
    <div class="min-h-screen bg-gray-100">
        <Header />

        <div class="container mx-auto py-8">
            <router-link :to="{ name: 'cart' }" class="text-gray-500 hover:text-gray-700 cursor-pointer mb-4">
                Back to Cart
            </router-link>

        <h1 class="flex items-center justify-center text-3xl font-bold mb-6">Checkout</h1>

        <div class="bg-white rounded-lg shadow-md p-4">
            <p class="flex items-center justify-center text-lg font-semibold mb-4">
                Please review your order:
            </p>

            <div class="flex flex-col items-center">
                <div class="flex items-center justify-between mb-4 w-96"
                    v-for="item in CART" :key="item._id">
                        <div>
                            <img class="w-16 h-16 object-cover rounded-md mr-4"
                                :src="item.imageUrl"
                                :alt="item.title"
                            />
                            <p class="text-lg font-semibold">{{ item.title }}</p>
                            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
                        </div>
                            <p class="text-lg font-semibold">{{ item.price }}</p>
                </div>
            </div>

            <div class="flex justify-center items-center mt-6">
                <p class="text-lg font-semibold">Total:</p>
                <p class="text-lg font-semibold ml-2">{{ getTotalCost }}</p>
            </div>

            <div class="flex justify-center items-center mt-8">
                <button class="w-60 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-xl"
                    @click="confirmOrder"
                >
                    Confirm Order
                </button>
            </div>
        </div>
      </div>
  
      <!-- Order Confirmation Modal -->
        <div v-if="showConfirmationModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold mb-4">Confirm Order</h2>
                <p class="mb-4">
                    Please confirm your order. Once confirmed, it cannot be changed.
                </p>
                <div class="flex justify-end">
                    <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                        @click="placeOrder"
                    >
                        Confirm
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                        @click="cancelOrder"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
    import Header from '../Home/Header/Header.vue';
    import CartItem from '../Cart/CartItem.vue';
    import { ICart } from '@/models/ICart';
    import { mapActions, mapGetters } from 'vuex';
    import { defineComponent } from 'vue';
    import { OrderCreation } from '@/models/IOrder';

    export default defineComponent({
        components: { Header, CartItem },
        data() {
            return {
                orderItems: [] as OrderCreation[],
                showConfirmationModal: false
            }
        },
        computed: {
            ...mapGetters([
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
        },
        methods: {
            ...mapActions('orders',[
                'CREATE_ORDER',
            ]),
            ...mapActions([
                'DELETE_EVERYTHING_FROM_CART'
            ]),
            setOrderItems() {
                this.CART.forEach(item => {
                    this.orderItems.push({
                        amount: item.quantity,
                        dishId: item._id,
                    } as OrderCreation)
                })
            },
            confirmOrder() {
                this.showConfirmationModal = true;
            },
            async placeOrder() {
                try {
                    const data = {orderItems: this.orderItems}
                    const res = await this.CREATE_ORDER(data);
                    if (res.data) {
                        this.showConfirmationModal = false;
                        this.$router.push({name: 'home'});
                        this.DELETE_EVERYTHING_FROM_CART();

                    }
                } catch(e) {
                    console.log('oops');
                }
            },
            cancelOrder() {
                this.showConfirmationModal = false;
            },
        },
        mounted(): void {
            this.setOrderItems();
        }
    });
  </script>
  
  <style>
  
  </style>