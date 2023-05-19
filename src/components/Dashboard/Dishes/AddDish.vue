<template>
    <Header />
    <div class="flex flex-col items-center justify-center h-full">
        <form @submit.prevent="onSubmit"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
            <h2 class="text-4xl font-bold text-gray-700 mb-8">Create Dish</h2>
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
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="title">
                    Select a category
                </label>
                <Select 
                    :selected="category"
                    :options="CATEGORIES"
                    @select="chooseCategory"
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="title">
                    Price
                </label>
                <input v-model.trim="price"
                    class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="price" type="number" placeholder="Enter price" />
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-xl">
                    Add Dish
                </button>
            </div>
            <ul v-if="errors.length" class="flex flex-col items-center justify-center mt-1 text-red-500 text-sm">
                    <li 
                        v-for="error in errors" 
                        :key="error">
                        {{ error }}
                    </li>
            </ul>
        </form>
    </div>
</template>

<script lang="ts">
    import Header from '@/components/Home/Header/Header.vue';
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from 'vuex';
    import Select from '@/components/Select/Select.vue';
    import { ICategory } from '@/models/ICategory';

    export default defineComponent({
        name: 'DashboardAddDish',
        components: { Header, Select },
        data() {
            return {
                title: '',
                description: '',
                category: 'Select Category',
                price: null,
                errors: [] as Array<string>

            }
        },
        computed: {
            ...mapGetters('category',[
                'CATEGORIES'
            ]) as {CATEGORIES: () => ICategory[]},
        },
        methods: {
            ...mapActions('dishes',[
                'CREATE_DISH',
            ]),
            ...mapActions('category',[
                'GET_CATEGORIES_FROM_API'
            ]),
            async onSubmit() {
                this.errors = [];

                try {
                    if (!this.title || !this.description || !this.price) {
                        this.errors.push('Invalid dish data');
                        return;
                    }

                    const data = {title: this.title, description: this.description, categoryId: this.getSelectedCategoryId(), price: this.price};
                    const res = await this.CREATE_DISH(data);
                    if (res.data) {
                        this.$router.push({name: 'dashboardDishes'});
                    }
                } catch (error: any) {
                    this.errors.push(error?.response?.data?.message);
                }
            },

            chooseCategory(category: ICategory) {
                this.category = category.title;
            },
            getSelectedCategoryId(): string {
                const selectedCategory = this.CATEGORIES.find(({title}) => title === this.category);
                if (selectedCategory) {
                    return selectedCategory._id;
                }

                return '';
            }

        },
        mounted(): void {
            this.GET_CATEGORIES_FROM_API(true);
        }
})
</script>

<style></style>