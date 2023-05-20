<template>
    <div>
        <Header />

        <div class="container py-8 ml-2">
            <router-link :to="{ name: 'dashboard' }" class="text-gray-500 hover:text-gray-700 cursor-pointer mb-4">
                Back to Dashboard
            </router-link>
        </div>

        <div class="flex flex-row justify-between items-center mb-4 mt-8 ml-2">
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
              Order details
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in filteredOrders" :key="order._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.user.fullName }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="h-10 px-5 text-sky-700 transition-colors duration-150 border border-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-500 hover:text-sky-100"
                        @click="showDetails(order._id)"
                    >View details
                </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.totalPrice }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div v-if="order.isPaid" class="text-sm text-gray-900">Paid</div>
              <div v-else class="text-sm text-gray-900">Unpaid</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.createdAt }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.updatedAt }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
                        @click="changeStatus(order._id)"
                    >Change
                </button>
            </td>
          </tr>
        </tbody>
      </table>

        <StatusConfirmationModal
            v-if="showConfirmationModal"
            @confirm="confirmChange"
            @cancel="cancelConfirmation"
            :showConfirmation="showConfirmationModal" 
        />

        <OrderDetailsModal
            v-if="showDetailsModal"
            @closeDetails="closeDetailsModal"
            :showDetails="showDetailsModal"
            :order_data="order_data"
        />
    </div>
</template>

<script lang="ts">
    import { IOrder } from "@/models/IOrder";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';
    import OrderDetailsModal from "./Modals/OrderDetailsModal.vue";
    import StatusConfirmationModal from "./Modals/StatusConfirmationModal.vue";

    export default defineComponent ({
        name: 'DashboardOrders',
        components: {Header, OrderDetailsModal, StatusConfirmationModal},
        data() {
            return {
                search: '',
                showConfirmationModal: false,
                showDetailsModal: false,
                currentOrderId: '',
                order_data: {} as IOrder
            }
        },
        computed: {
            ...mapGetters('orders',[
                'ORDERS'
            ]) as {ORDERS: () => IOrder[]},

            filteredOrders(): IOrder[] {
                console.log(this.ORDERS);
                return this.ORDERS.filter(order => order.user.fullName.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            ...mapActions('orders',[
                'GET_ORDERS_FROM_API',
                'UPDATE_ORDER',
                'GET_ONE_ORDER'
            ]),
            changeStatus(id: string) {
                this.showConfirmationModal = true;
                this.currentOrderId = id;
            },  
            async confirmChange() {
                try{
                    const order = await this.UPDATE_ORDER({id: this.currentOrderId, isPaid: true});
                    if (order.data) {
                        this.showConfirmationModal = false;
                        this.currentOrderId = '';
                    }
                } catch (e) {
                    console.log('oops')             
                }
            },
            async showDetails(orderId: string) {
                this.currentOrderId = orderId;
                try {
                    const order = await this.GET_ONE_ORDER({id: this.currentOrderId});
                    if (order) {
                        this.showDetailsModal = true;
                        this.order_data = order;
                    }
                } catch (e) {
                    console.log('oops')
                }
            },
            closeDetailsModal() {
                this.showDetailsModal = false;
            },
            cancelConfirmation() {
                this.showConfirmationModal = false;
            }
        },
        async mounted() {
            await this.GET_ORDERS_FROM_API();
        }
    })
</script>

<style>
</style>