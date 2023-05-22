import { DefaultAPIInstance } from "@/api"
import { AuthAPI } from "@/api/AuthAPI/authAPI"
import { RegisterAPI } from "@/api/RegisterAPI/registerAPI"
import { Commit } from "vuex"

interface authState {
    credentials: {
        token: string | null
        userRole: string
    }
}

export enum UserRoles {
    Guest = 'guest',
    User ='user',
    Admin = 'admin'
}

export const authModule = {
    namespaced: true,

    state(): authState {
        return {
            credentials: {
                token: localStorage.getItem('token') || null,
                userRole: localStorage.getItem('userRole') || UserRoles.Guest
            }
        }
    },
    getters: {
        // getUserRole(state: authState) {
        //     return state.credentials.userRole
        // }
        GET_USER_ROLE(state: authState) {
            return state.credentials.userRole
        }
    },
    mutations: {
        SET_TOKEN(state: authState, token: string) {
            state.credentials.token = token
            localStorage.setItem('token', token)
        },
        // SET_USER_ROLE(state: authState, userRole: string) {
        //     state.credentials.userRole = userRole
        //     localStorage.setItem('userRole', userRole)
        // },
        SET_USER_ROLE(state: authState, isAdmin: boolean) {
            if (isAdmin) {
                state.credentials.userRole = UserRoles.Admin
                localStorage.setItem('userRole', UserRoles.Admin)
            } else {
                state.credentials.userRole = UserRoles.User
                localStorage.setItem('userRole', UserRoles.User)
            }
        },
        DELETE_TOKEN(state: authState) {
            state.credentials.token = null
            localStorage.removeItem('token')
        },
        // DELETE_USER_ROLE(state: authState) {
        //     state.credentials.userRole = null
        //     localStorage.removeItem('userRole')
        // }
        DELETE_USER_ROLE(state: authState) {
            state.credentials.userRole = UserRoles.Guest
            localStorage.removeItem('userRole')
        },

        

    },

    actions: {
        async onLogin({commit} : {commit: Commit}, {email, password} : {email: string, password: string}) {
            const res = await AuthAPI.login(email, password);

            if (res && res.status === 200 && res.data) {
                commit('SET_TOKEN', res.data.token);
                commit('SET_USER_ROLE', res.data.isAdmin);
                
                DefaultAPIInstance.defaults.headers['authorization'] = `Bearer ${res.data.token}`;
            }
            
            return res;
        },

        onLogout({commit} : {commit: Commit}) {
            commit('DELETE_TOKEN')
            commit('DELETE_USER_ROLE')
            delete DefaultAPIInstance.defaults.headers['authorization']
        },

        async onRegister({commit} : {commit: Commit}, {fullName, email, password}: {fullName: string, email: string, password: string}) {
            const res = await RegisterAPI.register(fullName, email, password, false);
            
            if (res && res.status === 200 && res.data) {
                return res.data;
            }
            return res; 
        },

        async GET_USER_BY_TOKEN() {
            const res = await AuthAPI.getUserByToken();
            if (res && res.status === 200 && res.data) {
                return res.data;
            }

            return res;
        }
    }
}