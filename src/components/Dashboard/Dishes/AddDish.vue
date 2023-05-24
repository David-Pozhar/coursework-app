<template>
    <Header />
    <div class="mt-8 flex flex-col items-center justify-center h-auto">
        <form @submit.prevent="onSubmit" enctype="multipart/form-data"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
            <h2 class="text-center text-4xl font-bold text-gray-700 mb-8">Create Dish</h2>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="title">
                    Title
                </label>
                <input v-model.trim="title" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="title" type="text" placeholder="Enter title" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2 text-xl" for="description">
                    Description
                </label>
                <textarea v-model.trim="description" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="description" placeholder="Enter description"
                ></textarea>
            </div>
            <div>
                <input type="file" name="image" id="image" @change="uploadImage" class="hidden" />
                <label for="image" class="mb-4 cursor-pointer flex items-center justify-center bg-white rounded-md py-3 px-4 border border-gray-300 shadow-sm hover:bg-gray-100">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span class="ml-2 text-base font-medium text-gray-700">Upload Image</span>
                </label>
                <img v-if="imageUrl" :src="imageHostName + imageUrl" class="my-4 rounded-md shadow-md" />
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
                <input v-model.trim="price" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="price" type="number" placeholder="Enter price"
                />
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-xl">
                    Add Dish
                </button>
            </div>
            <Error :errors="errors" />
        </form>
    </div>
  </template>

<script lang="ts">
    import Header from '@/components/Home/Header/Header.vue';
    import { defineComponent } from "vue";
    import { mapActions, mapGetters } from 'vuex';
    import Select from '@/components/Select/Select.vue';
    import { ICategory } from '@/models/ICategory';
    import { DataError } from '@/types/types';
    import Error from '@/components/common/Error/Error.vue';
    import { IMAGE_HOST_NAME } from '@/config';

    export default defineComponent({
        name: 'DashboardAddDish',
        components: { Header, Select, Error },
        data() {
            return {
                title: '',
                description: '',
                category: 'Select Category',
                price: null,
                errors: [] as Array<string>,
                imageUrl: '' as String,
                imageHostName: IMAGE_HOST_NAME

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
                'UPLOAD_IMAGE'
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
                    } else if (this.category === 'Select Category') {
                        this.errors.push('Choose a category for the dish');
                        return;
                    }

                    const data = {title: this.title, description: this.description, imageUrl: this.imageUrl, categoryId: this.getSelectedCategoryId(), price: this.price};
                    const res = await this.CREATE_DISH(data);
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
            },
            async uploadImage(event: Event) {
                this.errors = [];

                try {
                    const inputElement = event.target as HTMLInputElement;

                    if (inputElement.files && inputElement.files.length) {
                        const file = inputElement.files[0];
                        const inputName = inputElement.name;

                        const res = await this.UPLOAD_IMAGE({ name: inputName, image: file });

                        if (res) {
                            this.imageUrl = res.url;
                        }
                    }
                } catch (error: any) {
                    this.errors.push('Failed to upload the image. Please try again!');
                }
            }

        },
        mounted(): void {
            this.GET_CATEGORIES_FROM_API(true);
        }
})
</script>

<style></style>