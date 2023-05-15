import { Commit } from 'vuex';
import {DishesAPI} from '@/api/DishesAPI/dishesAPI';
import { IDish } from '@/models/IDish';

interface DishState {
    dishes: IDish[]
}

export const dishModule = {
    namespaced: true,

    state(): DishState {
        return {
            dishes: []
        }
    },
    mutations : {
        SET_PRODUCTS_TO_STATE(state: DishState, data: DishState) {
            state.dishes = data.dishes;
        },
    },
    actions : {
        async GET_PRODUCTS_FROM_API({commit} : {commit: Commit}) {
            const res = await DishesAPI.dishes();
            
            if (res && res.status === 200 && res.data) {
                commit('SET_PRODUCTS_TO_STATE', res.data);
            }

            return res;
        },
    },
    getters: {
        PRODUCTS(state : DishState): IDish[] {
            return state.dishes;
        },
    },
}