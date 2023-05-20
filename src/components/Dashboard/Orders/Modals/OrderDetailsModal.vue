<template>
    <div v-if="showDetailsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="flex justify-center items-center text-2xl font-bold mb-4">Order Details</h2>
            <div v-if="order_data.orderItems">
                <div v-for="order in order_data.orderItems" :key="order._id" class="mb-4">
                    <div class="flex items-center mb-2">
                        <img class="w-16 h-16 object-cover rounded-md mr-4" 
                            src="https://assets.noshu.com/uploads/2022/03/Noshu-PancakeMix-LC-Hero-750px.png" 
                            :alt="order.dish.title" />
                        <div>
                            <p class="text-lg font-semibold">{{ order.dish.title }}</p>
                            <p class="text-gray-500">Quantity: {{ order.amount }}</p>
                        </div>
                    </div>
                    <p class="text-lg font-semibold">Price: {{ order.price }}</p>
                </div>
                <div class="flex justify-center items-center mt-6">
                    <p class="text-lg font-semibold">Total:</p>
                    <p class="text-lg font-semibold ml-2">{{ order_data.totalPrice }}</p>
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg" 
                    @click="closeDetails">
                        Close
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { IOrder } from '@/models/IOrder';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'OrderDetailsModal',
        data() {
            return {
                showDetailsModal: this.showDetails
            }
        },
        props: {
            order_data: {
                type: Object as () => IOrder,
                default: () => ({})
            },
            showDetails: {
                type: Boolean,
                default: null
            }
        },
        methods: {
            closeDetails() {
                this.$emit('closeDetails');
            }
        }
    })
</script>

<style>

</style>