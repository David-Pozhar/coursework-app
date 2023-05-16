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
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-xl">
                    Save
                </button>
            </div>
            <ul v-if="errors.length" class="flex flex-col justify-center items-center mt-4 text-red-500 text-sm">
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
import { mapActions} from 'vuex';

type DataError = {
    type: string;
    msg: string;
}

export default defineComponent({
    name: 'DashboardUpdateDish',
    components: { Header },
    props: {
        id: {
            type: String
        },
    },
    data() {
        return {
            title: '',
            description: '',
            errors: [] as String[]
        }
    },
    computed: {},
    methods: {
        ...mapActions('dishes',[
            'UPDATE_DISH',
            'GET_ONE_DISH'
        ]),
        async onSubmit() {
            this.errors = [];

            try {
                const data = {id: this.id, title: this.title, description: this.description};
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
        }
    },
    async mounted() {
        const dish = await this.GET_ONE_DISH(this.id);
        this.title = dish.title;
        this.description = dish.description;
    }
})
</script>

<style></style>