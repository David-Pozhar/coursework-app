import Vue from 'vue'
import {createStore} from 'vuex'
import { IDish } from '@/models/IDish'
import { ICart } from '@/models/ICart'
import actions from './actions/actions'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import { authModule } from './modules/AuthModule/authModule'
import { categoryModule } from './modules/CategoryModule/categoryModule'
import { dishModule } from './modules/DishModule/dishModule'
import { dashboardModule } from './modules/DashboardModule/dashboardModule'
import { usersModule } from './modules/DashboardModule/UsersModule/usersModule'

export default interface State {
    products: IDish[],
    cart: ICart[]
}

export const store = createStore<State>({
    state: {
        products: [],
        cart: [],
    },
    mutations,
    actions,
    getters,

    modules: {
        auth: authModule,
        category: categoryModule,
        dishes: dishModule,
        //dashboard: dashboardModule,
        users: usersModule
    }
})