<template>
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
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapActions } from 'vuex';
    import { DEFAULT_PAGE_SIZE, DEFAULT_MAXPAGE_SHOWN } from '@/config';

    export default defineComponent({
        name: 'Paginator',
        props: {
            paginatorName: {
                type: String,
                default: '',
                required: true
            },
            userId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                currentPage: 1,
                pageSize: DEFAULT_PAGE_SIZE,
                total: 0,
                maxPagesShown: DEFAULT_MAXPAGE_SHOWN
            }
        },
        methods: {
            ...mapActions('dishes',[
                'GET_PRODUCTS_FROM_API_WITH_PAGINATION',
            ]),
            ...mapActions('category',[
                'GET_CATEGORIES_FROM_API_WITH_PAGINATION',
            ]),
            ...mapActions('orders',[
                'GET_ORDERS_FROM_API',
            ]),
            ...mapActions('users',[
                'GET_USERS_FROM_API',
            ]),
            ...mapActions('orders',[
                'GET_USER_ORDERS'
            ]),
            async getServerResponseForPaginator(paginatorName: string) {
                let response = [];
                switch(paginatorName) {
                    case 'dishes':
                        response = await this.GET_PRODUCTS_FROM_API_WITH_PAGINATION({ currentPage: this.currentPage, pageSize: this.pageSize });
                        break;
                    case 'categories':
                        response = await this.GET_CATEGORIES_FROM_API_WITH_PAGINATION({ currentPage: this.currentPage, pageSize: this.pageSize });
                        break;
                    case 'orders':
                        response = await this.GET_ORDERS_FROM_API({ currentPage: this.currentPage, pageSize: this.pageSize });
                        break;
                    case 'myOrders':
                        response = await this.GET_USER_ORDERS({ currentPage: this.currentPage, pageSize: this.pageSize, userId: this.userId });
                        break;
                    case 'users':
                        response = await this.GET_USERS_FROM_API({ currentPage: this.currentPage, pageSize: this.pageSize });
                        break;

                }
                return this.total = response?.totalCount || 0;
            },
            async onClickHandler(page: number) {
                this.currentPage = page;
                this.$router.push({ query: { page: this.currentPage } });
                this.getServerResponseForPaginator(this.paginatorName);
            }
        },
        async mounted() {
            this.currentPage = parseInt(this.$route.query.page as string, 10) || 1;
            this.getServerResponseForPaginator(this.paginatorName);
        }
    })
</script>

<style>

</style>