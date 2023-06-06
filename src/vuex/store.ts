import Vue from 'vue'
import {createStore} from 'vuex'
import { authModule } from './modules/AuthModule/authModule'
import { categoryModule } from './modules/CategoryModule/categoryModule'
import { dishModule } from './modules/DishModule/dishModule'
import { usersModule } from './modules/UsersModule/usersModule'
import { ordersModule } from './modules/OrderModule/orderModule'
import CartState, { cartModule } from './modules/CartModule/cartModule'

export default interface State {
    cart: CartState,
}

export const store = createStore<State>({
    modules: {
        auth: authModule,
        category: categoryModule,
        dishes: dishModule,
        users: usersModule,
        orders: ordersModule,
        cart: cartModule
    }
})