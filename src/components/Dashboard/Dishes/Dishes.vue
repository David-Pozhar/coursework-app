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
                placeholder="Search by Title">
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category Id
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="dish in filteredDishes" :key="dish._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish._id }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.price }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.category._id }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script lang="ts">
    import { IDish } from "@/models/IDish";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';

    export default defineComponent ({
        name: 'DashboardCategories',
        components: {Header},
        data() {
            return {
                search: '',
            }
        },
        computed: {
            ...mapGetters('dishes',[
                'PRODUCTS'
            ]) as {PRODUCTS: () => IDish[]},

            filteredDishes() {
                return this.PRODUCTS.filter(dish => dish.title.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            ...mapActions('dishes',[
                'GET_PRODUCTS_FROM_API',
            ])
        },
        mounted(): void {
            this.GET_PRODUCTS_FROM_API();
        }
    })
</script>

<style>

</style>