<template>
    <div class="h-screen bg-black flex items-center justify-center">
        <div class="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
            <div class="absolute inset-0 transition duration-300 animate-pink blur gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
            <div class="p-10 rounded-xl z-10 w-full h-full bg-black">
                <h5 class="flex items-center justify-center text-3xl text-white">Login</h5>
                <form @submit.prevent="onSubmit" 
                        class="w-full space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            class="block text-lg font-medium text-gray-200">Email
                        </label>
                        <input type="email" v-model="email" placeholder="Email"
                                class="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200">
                    </div>
                    <div>
                        <label 
                                htmlFor="password"
                                class="block text-lg font-medium text-gray-200">Password
                        </label>
                        <input type="password" v-model="password" placeholder="Password"
                                class="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200">
                    </div>
                    
                    <button
                        class="w-full px-4 py-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold"
                        >Login
                    </button>
                    <Error :errors="errors"/>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapActions } from 'vuex';
    import Error from '@/components/common/Error/Error.vue';

    export default defineComponent({
        name: 'Login',
        components: {Error},
        props: {},
        data() {
            return {
                email: '',
                password: '',
                errors: [] as Array<string>
            }
        },
        methods: {
            ...mapActions('auth', [
                'onLogin',
            ]),
            async onSubmit() {
                this.errors = [];

                try {
                    if (localStorage.getItem('token') !== null) {
                        this.$router.push({name: 'home'});
                        return;
                    }
                    
                    if (!this.email || !this.password) {
                        this.errors.push('Invalid login data');
                        return;
                    }

                    const data = { email: this.email, password: this.password };
                    const res = await this.onLogin(data);
                   
                    if (res.data && res.data.token !== null) {
                        this.$router.push({name: 'home'});
                    } else {
                        this.errors.push('Wrong login or password');
                    }
                } catch (error: any) {
                    this.errors.push(error?.response?.data?.message);
                }
            }
        }
    });
</script>

<style>

</style>