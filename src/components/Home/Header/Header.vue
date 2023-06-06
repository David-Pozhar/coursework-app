<template>
    <nav class="text-white bg-black">
            <div class="container w-full mx-auto flex flex-wrap items-center justify-around mt-0 py-4">

                <div class="logo_wrapper block w-44">
                    <router-link to='/'>
                        <img src='../../../assets/icons/logo.png' alt="logo" class='h-20 object-cover'/>
                    </router-link>
                </div>

                <div class="menu_wrapper flex items-center justify-between space-x-10">
                    <router-link to='/' class='text-xl'>Home</router-link>
                    <router-link v-if="checkUserRole === 'admin'" to='/dashboard' class='text-xl'>Dashboard</router-link>
                    <router-link to='/about' class='text-xl'>About</router-link>
                </div>

                <div
                    v-if="checkUserRole === 'guest'"
                    class="account_and_order flex items-center justify-center space-x-4">
                    <router-link to='/cart' class='mr-4 relative'>
                        <img src='../../../assets/icons/cart.svg' alt="cart"/>
                        <div v-if="CART.length"
                            class="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1"
                             >{{ CART.length }}
                        </div>
                    </router-link>
                    <router-link to='/login'>Log In</router-link>
                    <router-link to='/register'>Sign Up</router-link>
                </div>
                <div 
                    v-else
                    class="account_and_order flex items-center justify-center space-x-4">
                    <router-link to='/cart' class='mr-4 relative'>
                        <img src='../../../assets/icons/cart.svg' alt="cart"/>
                        <div v-if="CART.length"
                            class="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1"
                             >{{ CART.length }}
                        </div>
                    </router-link>
                    <router-link to='/'
                            @click="Logout"
                        >Logout
                    </router-link>
                    <router-link :to="{name: 'myOrders'}">My orders</router-link>
                </div>
            </div>
        </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapActions, mapGetters } from 'vuex';

    export default defineComponent({
        name: 'Header',
        computed: {
            ...mapGetters('auth',[
                'GET_USER_ROLE'
            ]),
            ...mapGetters('cart',[
                'CART',
            ]),
            checkUserRole(): string {
                return this.GET_USER_ROLE;
            }
        },
        methods: {
            ...mapActions('auth',[
                'onLogout',
            ]),
            Logout(): void {
                this.onLogout();
                this.$router.push({name: 'home'});
            }
        },
    });
</script>

<style>

</style>