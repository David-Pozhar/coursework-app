<template>
    <Header />
    <div class="container mx-auto p-4">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-center text-3xl font-bold mb-6">My Orders</h2>
            <div v-if="isFetching" class="flex justify-center items-center">
                <img src="../../assets/img/preloader.gif" alt="Loading...">
            </div>
            <div v-else-if="ORDERS.length">
                <div v-for="order in ORDERS" :key="order._id" class="mb-8 border-b pb-4">
                    <div v-for="orderItem in order.orderItems" :key="orderItem._id" class="flex items-center mb-4">
                        <img class="w-16 h-16 object-cover rounded-md mr-4"
                            src="https://assets.noshu.com/uploads/2022/03/Noshu-PancakeMix-LC-Hero-750px.png"
                            :alt="orderItem.dish.title" />
                        <div>
                            <h3 class="text-xl font-semibold">{{ orderItem.dish.title }}</h3>
                            <p class="text-gray-600">Quantity: {{ orderItem.amount }}</p>
                            <p class="text-lg font-semibold">Price: {{ orderItem.price }}</p>
                        </div>
                    </div>
                    <p class="text-lg font-semibold">Created At: {{ formatCreatedAt(order.createdAt) }}</p>
                    <p :class="[order.isPaid ? 'text-lg font-semibold text-green-600' : 'text-lg font-semibold text-red-600']">
                        Status: {{ order.isPaid ? 'Approved' : 'Disapproved' }}
                    </p>
                    <div class="flex justify-end items-center mt-6">
                        <p class="text-lg font-semibold">Total:</p>
                        <p class="text-2xl font-semibold ml-2">{{ order.totalPrice }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-lg text-center">No orders available.</p>
            </div>
        </div>
        <Paginator :paginatorName="'myOrders'" />
    </div>
</template>


<script lang="ts">
    import { IOrder } from '@/models/IOrder';
    import { defineComponent } from 'vue';
    import { mapGetters } from 'vuex';
    import Header from '../Home/Header/Header.vue';
    import { formatDate } from '../common/FormatDate/formatDate';
    import Paginator from '../common/Paginator/Paginator.vue';

    export default defineComponent({
        name: 'MyOrders',
        components: {Header, Paginator},
        data() {
            return {
                isFetching: true,
            }
        },
        computed: {
            ...mapGetters('orders',[
                'ORDERS'
            ]) as {ORDERS: () => IOrder[]},
            watchedProperty(): IOrder[] {
                return this.ORDERS;
            }
        },
        methods: {
            formatCreatedAt(createdAt: string): string {
                return formatDate(createdAt);
            }
        },
        watch: {
            watchedProperty() {
                this.isFetching = false;
            }
        }
    })
</script>

<style>

</style>