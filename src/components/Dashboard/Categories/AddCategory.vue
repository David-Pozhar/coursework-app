<template>
    <Header />
    <div class="flex flex-col items-center justify-center h-full">
        <form @submit.prevent="onSubmit"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
            <h2 class="text-4xl font-bold text-gray-700 mb-8">Create Category</h2>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="title">
                    Title
                </label>
                <input v-model.trim="title"
                    class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="title" type="text" placeholder="Enter title" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="description">
                    Description
                </label>
                <textarea v-model.trim="description"
                    class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="description" placeholder="Enter description">
                </textarea>
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-xl">
                    Add Category
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Header from '@/components/Home/Header/Header.vue';
import { defineComponent } from "vue";
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'DashboardAddCategory',
    components: { Header },
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        ...mapActions('category',[
            'CREATE_CATEGORY',
        ]),
        async onSubmit() {
            try {
                const data = {title: this.title, description: this.description};
                const res = await this.CREATE_CATEGORY(data);
                if (res.data) {
                    this.$router.push({name: 'dashboardCategories'});
                }
            } catch(e) {
                console.log('oops');
            }
        }
    }
})
</script>

<style></style>