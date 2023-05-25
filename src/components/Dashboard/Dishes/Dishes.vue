<template>
    <div>
        <Header />

        <div class="container py-8 ml-2">
            <router-link :to="{ name: 'dashboard' }" class="text-gray-500 hover:text-gray-700 cursor-pointer mb-4">
                Back to Dashboard
            </router-link>
        </div>

        <div class="flex items-center space-x-4 mb-4 mt-8 ml-2">
            <div class="w-1/3">
                <label for="search" class="sr-only">Search</label>
                <input type="text"
                        id="search"
                        v-model="search"
                        class="h-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search by Title">
            </div>
            <router-link to="/dashboard/addDish">
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add dish
                </button>
            </router-link>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
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
              Category
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete dish
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="dish in filteredDishes" :key="dish._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ truncatedText(dish.description) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ dish.price }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div v-if="dish.category" class="text-sm text-gray-900">{{ dish.category.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <router-link :to="{name: 'dashboardUpdateDish', params:{id: dish._id}}">
                    <button class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100">
                        Edit
                    </button>
                </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="h-10 px-5 text-red-700 transition-colors duration-150 border border-red-500 rounded-lg focus:shadow-outline hover:bg-red-500 hover:text-red-100"
                        @click="confirmDelete(dish._id)">
                    Delete dish
                </button>
            </td>
          </tr>
        </tbody>
      </table>
      <vue-awesome-paginate
        :total-items="total"
        :items-per-page="pageSize"
        :max-pages-shown="maxPagesShown"
        v-model="currentPage"
        :on-click="onClickHandler"
        paginate-buttons-class="btn"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
      />
    </div>
  </template>

<script lang="ts">
    import { IDish } from "@/models/IDish";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';
    import {truncateText} from '../../common/TruncateText/truncateText';

    export default defineComponent ({
        name: 'DashboardCategories',
        components: { Header },
        data() {
            return {
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                maxPagesShown: 10
            }
        },
        computed: {
            ...mapGetters('dishes',[
                'PRODUCTS'
            ]) as {PRODUCTS: () => IDish[]},

            filteredDishes(): IDish[] {
                return this.PRODUCTS.filter(dish => dish.title.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            ...mapActions('dishes',[
                'GET_PRODUCTS_FROM_API',
                'DELETE_DISH',
            ]),
            confirmDelete(id: string): void {
                if (window.confirm("Are you sure you want to delete the dish?")) {
                    this.deleteDish(id);
                }
            },
            async deleteDish(id: string) {
                const res = await this.DELETE_DISH(id);
                if (res.data) {
                    this.$router.push({name: 'dashboardDishes'});
                }
            },
            truncatedText(text: string): string {
              return truncateText(text);
            },
            async onClickHandler(page: number) {
                this.currentPage = page;
                this.$router.push({ query: { page: this.currentPage } });
                const response = await this.GET_PRODUCTS_FROM_API({ currentPage: this.currentPage, pageSize: this.pageSize });
                this.total = response?.totalCount || 0;
            }
        },
        async mounted() {
            this.currentPage = parseInt(this.$route.query.page as string, 10) || 1;
            const response = await this.GET_PRODUCTS_FROM_API({ currentPage: this.currentPage, pageSize: this.pageSize });
            this.total = response?.totalCount || 0;
        }
    })
</script>

<style>

</style>