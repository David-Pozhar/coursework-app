import Vue from 'vue'
import { store } from '@/vuex/store'
import { RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext  } from 'vue-router'
import Menu from '../components/Menu/Menu.vue'
import Cart from '../components/Cart/Cart.vue'
import Checkout from '../components/Checkout/Checkout.vue'
import Login from '../components/Login/Login.vue'
import Register from '../components/Register/Register.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import DashboardUsers from '../components/Dashboard/Users/Users.vue'
import DashboardCategories from '../components/Dashboard/Categories/Categories.vue'
import DashboardAddCategory from '../components/Dashboard/Categories/AddCategory.vue'
import DashboardUpdateCategory from '../components/Dashboard/Categories/UpdateCategory.vue'
import DashboardDishes from '../components/Dashboard/Dishes/Dishes.vue'
import DashboardAddDish from '../components/Dashboard/Dishes/AddDish.vue'
import DashboardUpdateDish from '../components/Dashboard/Dishes/UpdateDish.vue'
import DashboardOrders from '../components/Dashboard/Orders/Orders.vue'
import Home from '../components/Home/Home.vue'
import {UserRoles} from '../vuex/modules/AuthModule/authModule'


const checkoutGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (store.state.cart.length) {
        next();
    } else {
        next({name: 'cart'});
    }
}
const isAuthorized = localStorage.hasOwnProperty('token');

const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (!isAuthorized) {
        next({ name: 'login' });
    } else {
        next();
    }
}

const managerAuthGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (!isAuthorized) {
        next({name: 'login'});
    } else if (localStorage.getItem('userRole') !== UserRoles.Admin) {
        next({name: 'home'});
    } else {
        next();
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/menu',
        name: 'menu',
        component: Menu,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        // beforeEnter: authGuard,
        props: true
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        beforeEnter: [authGuard, checkoutGuard]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/users',
        name: 'dashboardUsers',
        component: DashboardUsers,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/categories',
        name: 'dashboardCategories',
        component: DashboardCategories,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/addCategory',
        name: 'dashboardAddCategory',
        component: DashboardAddCategory,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/updateCategory/:id',
        name: 'dashboardUpdateCategory',
        component: DashboardUpdateCategory,
        beforeEnter: managerAuthGuard,
        props: true,
    },
    {
        path: '/dashboard/dishes',
        name: 'dashboardDishes',
        component: DashboardDishes,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/addDish',
        name: 'dashboardAddDish',
        component: DashboardAddDish,
        beforeEnter: managerAuthGuard
    },
    {
        path: '/dashboard/updateDish/:id',
        name: 'dashboardUpdateDish',
        component: DashboardUpdateDish,
        beforeEnter: managerAuthGuard,
        props: true,
    },
    {
        path: '/dashboard/orders',
        name: 'dashboardOrders',
        component: DashboardOrders,
        beforeEnter: managerAuthGuard
    },
]

export const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
}) 