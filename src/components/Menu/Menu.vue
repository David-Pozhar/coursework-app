<template>
    <Header/>

    <div class="text-black">
      <h1 class="flex items-center justify-center text-4xl font-bold mt-8">Menu</h1>
      <Select class="mt-4"
        :selected="selected"
        :options="CATEGORIES"
        @select="sortByCategories"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <MenuItem
          v-for="product in filterProductsBySelectedCategory"
          :key="product._id"
          :product_data="product"
          @addToCart="addToCart"
        />
      </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import MenuItem from './MenuItem/MenuItem.vue'
    import {mapActions, mapGetters} from 'vuex'
    import { IDish } from '@/models/IDish'
    import Select from '../Select/Select.vue'
    import {ICategory} from '../../models/ICategory'
    import Header from '../Home/Header/Header.vue';

    export default defineComponent({
        name: 'Menu',
        components: {
            MenuItem, Select, Header
        },
        props: {},
        data() {
            return {
                selected: 'Select Category',
                sortedProducts: [] as IDish[]
            }
        },
        computed: {
            ...mapGetters('dishes',[
                'PRODUCTS',
            ]),
            ...mapGetters('category',[
                'CATEGORIES'
            ]) as {CATEGORIES: () => ICategory[]},

            filterProductsBySelectedCategory() : IDish[] {
                if (this.sortedProducts.length) {
                    return this.sortedProducts;
                } else if (this.selected == 'Select Category') {
                    return this.PRODUCTS;
                } else {
                    return [];
                }
            }
        },
        methods: {
            ...mapActions([
                'ADD_TO_CART',
            ]),
            ...mapActions('category',[
                'GET_CATEGORIES_FROM_API',
            ]),
            ...mapActions('dishes',[
                'GET_PRODUCTS_FROM_API',
            ]),
            addToCart(data: IDish): void {
                this.ADD_TO_CART(data)
            },
            sortByCategories(category : ICategory) {
                this.sortedProducts = [];

                this.PRODUCTS.forEach((element : IDish) => {
                    if (element.category && element.category._id === category._id) {
                        this.sortedProducts.push(element);
                    }
                });
                this.selected = category.title;
            }
        },
        mounted(): void {
            this.GET_PRODUCTS_FROM_API();
            this.GET_CATEGORIES_FROM_API(true);
        }
    });
</script>

<style>

</style>