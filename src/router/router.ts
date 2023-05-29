import Vue from 'vue'
import { store } from '@/vuex/store'
import { RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext  } from 'vue-router'
import DishInfo from '../components/Menu/DishInfo/DishInfo.vue'
import Cart from '../components/Cart/Cart.vue'
import Checkout from '../components/Checkout/Checkout.vue'
import About from '../components/Home/About/About.vue'
import Login from '../components/Login/Login.vue'
import Register from '../components/Register/Register.vue'
import MyOrders from '../components/MyOrders/MyOrders.vue'
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

const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const isAuthorized = localStorage.hasOwnProperty('token');
    if (!isAuthorized) {
        next({ name: 'login' });
    } else {
        next();
    }
}

const managerAuthGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const isAuthorized = localStorage.hasOwnProperty('token');
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
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/dishes/:id',
        name: 'dishInfo',
        component: DishInfo,
        props: true
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
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
        path: '/myOrders',
        name: 'myOrders',
        component: MyOrders,
        beforeEnter: authGuard
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