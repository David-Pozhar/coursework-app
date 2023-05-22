<template>
    <Header />
    <div class="flex flex-col items-center justify-center h-full">
        <form @submit.prevent="onSubmit"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
            <h2 class="text-4xl font-bold text-gray-700 mb-8">Edit Dish</h2>
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
                    Save
                </button>
            </div>
            <Error :errors="errors"/>
        </form>
    </div>
</template>

<script lang="ts">
    import Header from '@/components/Home/Header/Header.vue';
    import { defineComponent } from "vue";
    import { mapActions, mapGetters} from 'vuex';
    import Select from '@/components/Select/Select.vue';
    import { ICategory } from '@/models/ICategory';
    import { DataError } from '@/types/types';
    import Error from '@/components/common/Error/Error.vue';

    export default defineComponent({
        name: 'DashboardUpdateDish',
        components: { Header, Select, Error },
        props: {
            id: {
                type: String
            },
        },
        data() {
            return {
                title: '',
                description: '',
                price: null,
                category: '',
                errors: [] as String[]
            }
        },
        computed: {
            ...mapGetters('category',[
                'CATEGORIES'
            ]) as {CATEGORIES: () => ICategory[]},
        },
        methods: {
            ...mapActions('dishes',[
                'UPDATE_DISH',
                'GET_ONE_DISH'
            ]),
            ...mapActions('category',[
                'GET_CATEGORIES_FROM_API'
            ]),
            async onSubmit() {
                this.errors = [];

                try {
                    if (!this.price) {
                        this.errors.push('Enter the price');
                        return;
                    }

                    const data = {id: this.id, title: this.title, description: this.description, price: this.price, categoryId: this.getSelectedCategoryId()};

                    if (data.categoryId === '0') {
                        this.errors.push('Select a category!');
                        return;
                    }
                    const res = await this.UPDATE_DISH(data);

                    if (res.data) {
                        this.$router.push({name: 'dashboardDishes'});
                    }
                } catch (error: any) {
                    const dataErrors: DataError[] | undefined = error?.response?.data;
                    if (dataErrors && dataErrors.length) {
                        dataErrors.forEach((err: DataError) => {
                            this.errors.push(err.msg);
                        })
                    }
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
        async mounted() {
            this.GET_CATEGORIES_FROM_API(true);

            const dish = await this.GET_ONE_DISH(this.id);
            this.title = dish.title;
            this.description = dish.description;
            this.price = dish.price;
            if (dish.category !== null) {
                this.category = dish.category.title;
            } else {
                this.category = 'Select Category';
            }
            
        }
    })
</script>

<style></style>