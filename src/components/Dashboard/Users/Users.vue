<template>
    <div>
        <Header />

        <div class="container py-8 ml-2">
            <router-link :to="{ name: 'dashboard' }" class="text-gray-500 hover:text-gray-700 cursor-pointer mb-4">
                Back to Dashboard
            </router-link>
        </div>

        <div class="flex flex-row justify-between items-center mb-4 ml-2">
            <div class="w-1/3">
                <label for="search" class="sr-only">Search</label>
                <input type="text"
                        id="search"
                        v-model="search"
                        class="h-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search by Full Name">
            </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
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
          <tr v-for="user in filteredUsers" :key="user._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.fullName }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(user.createdAt) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(user.updatedAt) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script lang="ts">
    import { IUser } from "@/models/IUser";
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from "vuex";
    import Header from '../../Home/Header/Header.vue';
    import { formatDate } from '../../common/FormatDate/formatDate';

    export default defineComponent ({
        name: 'DashboardUsers',
        components: {Header},
        data() {
            return {
                search: '',
            }
        },
        computed: {
            ...mapGetters('users',[
                'USERS'
            ]) as {USERS: () => IUser[]},

            filteredUsers(): IUser[] {
                return this.USERS.filter(user => user.fullName.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            ...mapActions('users',[
                'GET_USERS_FROM_API'
            ]),
            formatDate(date: string) {
              return formatDate(date);
            }
        },
        mounted(): void {
            this.GET_USERS_FROM_API();
        }
    })
</script>

<style>

</style>