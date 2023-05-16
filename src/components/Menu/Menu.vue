<template>
    <div class="menu">
        <router-link :to="{name: 'cart'}">
            <div class="cart">Cart: {{ CART.length }}</div>
        </router-link>

        <h1>Menu</h1>
        <Select 
            :selected="selected"
            :options="CATEGORIES"
            @select="sortByCategories"
        />
        <div class="menu_list">
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

    export default defineComponent({
        name: 'Menu',
        components: {
            MenuItem, Select
        },
        props: {},
        data() {
            return {
                selected: 'All',
                sortedProducts: [] as IDish[]
            }
        },
        computed: {
            ...mapGetters([
                'CART',
                
            ]),
            ...mapGetters('dishes',[
                'PRODUCTS',
            ]),
            ...mapGetters('category',[
                'CATEGORIES'
            ]) as {CATEGORIES: () => ICategory[]},

            filterProductsBySelectedCategory() : IDish[] {
                if (this.sortedProducts.length) {
                    return this.sortedProducts;
                } else if (this.selected == 'All') {
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
                    if (element.category._id === category._id) {
                        this.sortedProducts.push(element);
                    }
                });
                this.selected = category.title;
            }
        },
        mounted(): void {
            this.GET_PRODUCTS_FROM_API();
            this.GET_CATEGORIES_FROM_API();
        }
    });
</script>

<style scoped>

    h1 {
        text-align: center;
    }

    .menu {
        padding: 40px;
    }

    .menu_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .cart {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 16px;
        border: 1px solid grey;
    }
</style>