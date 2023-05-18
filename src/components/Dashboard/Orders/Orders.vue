<template>
    <div>
        <Header />
        <div class="flex flex-row justify-between items-center mb-4 mt-8">
        <div class="w-1/3">
          <label for="search" class="sr-only">Search</label>
          <input type="text"
                id="search"
                v-model="search"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by Full Name">
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer's Full Name
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Paid
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in filteredOrders" :key="order._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.user.fullName }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.totalPrice }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.isPaid }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.createdAt }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.updatedAt }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script lang="ts">
    import { IOrder } from "@/models/IOrder";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';

    export default defineComponent ({
        name: 'DashboardOrders',
        components: {Header},
        data() {
            return {
                search: '',
            }
        },
        computed: {
            ...mapGetters('orders',[
                'ORDERS'
            ]) as {ORDERS: () => IOrder[]},

            filteredOrders() {
                return this.ORDERS.filter(order => order.user.fullName.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            ...mapActions('orders',[
                'GET_ORDERS_FROM_API'
            ])
        },
        mounted(): void {
            this.GET_ORDERS_FROM_API();
        }
    })
</script>

<style>

</style>