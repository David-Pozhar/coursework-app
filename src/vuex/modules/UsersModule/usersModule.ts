import { UsersAPI } from "@/api/UsersAPI/usersAPI";
import { IUser } from "@/models/IUser";
import { Commit } from "vuex";

export interface UserState {
    users: IUser[]
}

export const usersModule = {
    namespaced: true,

    state(): UserState {
        return {
            users: []
        }
    },
    mutations : {
        SET_USERS_TO_STATE(state: UserState, data: UserState) {
            state.users = data.users;
        }
    },
    actions : {
        async GET_USERS_FROM_API({commit} : {commit: Commit}, {currentPage, pageSize}: {currentPage: number, pageSize: number}) {
            const res = await UsersAPI.users(currentPage, pageSize);
            if (res && res.status === 200 && res.data) {
                commit('SET_USERS_TO_STATE', res.data);
            }
            
            return res.data;
        }
    },
    getters: {
        USERS(state: UserState) {
            return state.users;
        }
    },
}