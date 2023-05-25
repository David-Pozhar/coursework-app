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
        <router-link to="/dashboard/addCategory">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Add category
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
              Created At
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete Category
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in filteredCategories" :key="category._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ category.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ truncatedText(category.description) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(category.createdAt) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(category.updatedAt) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <router-link :to="{name: 'dashboardUpdateCategory', params:{id: category._id}}">
                    <button class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
                        >Edit
                    </button>
                </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="h-10 px-5 text-red-700 transition-colors duration-150 border border-red-500 rounded-lg focus:shadow-outline hover:bg-red-500 hover:text-red-100"
                        @click="confirmDelete(category._id)">
                    Delete category
                </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginator :paginatorName="'categories'"/>
    </div>
  </template>

<script lang="ts">
    import { ICategory } from "@/models/ICategory";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';
    import { formatDate } from '../../common/FormatDate/formatDate';
    import {truncateText} from '../../common/TruncateText/truncateText';
    import Paginator from "@/components/common/Paginator/Paginator.vue";

    export default defineComponent ({
        name: 'DashboardCategories',
        components: {Header, Paginator},
        data() {
            return {
                search: '',
            }
        },
        computed: {
            ...mapGetters('category',[
                'CATEGORIES'
            ]) as {CATEGORIES: () => ICategory[]},

            filteredCategories(): ICategory[] {
                return this.CATEGORIES.filter((category: ICategory) => category.title.toLowerCase().includes(this.search.toLowerCase()));
            },  
        },
        methods: {
            ...mapActions('category',[
                'GET_CATEGORIES_FROM_API_WITH_PAGINATION',
                'DELETE_CATEGORY'
            ]),
            confirmDelete(id: string): void {
                if (window.confirm("Are you sure you want to delete the dish?")) {
                    this.deleteCategory(id);
                }
            },
            async deleteCategory(id: string) {
                const res = await this.DELETE_CATEGORY(id);
                if (res.data) {
                    this.$router.push({name: 'dashboardCategories'});
                }
            },
            formatDate(date: string) {
              return formatDate(date);
            },
            truncatedText(text: string): string {
              return truncateText(text);
            }
        },
    })
</script>

<style>

</style>