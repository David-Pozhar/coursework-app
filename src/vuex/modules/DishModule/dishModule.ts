import { Commit, ActionContext } from 'vuex';
import {DishesAPI} from '@/api/DishesAPI/dishesAPI';
import { IDish } from '@/models/IDish';
import State from '@/vuex/store';

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
        SET_NEW_DISH(state: DishState, data: IDish) {
            state.dishes.push(data);
        },
        EDIT_DISH(state: DishState, {id, title, description} : {id: string, title: string, description: string}) {
            const editableDish = state.dishes.find(({_id}) => _id === id);
            if (editableDish) {
                editableDish.title = title;
                editableDish.description = description;
            }
        },
        REMOVE_DISH(state: DishState, id: string) {
            const index = state.dishes.findIndex(dish => dish._id === id);

            if (index) {
                state.dishes.splice(index, 1);
            }
        }
    },
    actions : {
        async GET_PRODUCTS_FROM_API({commit} : {commit: Commit}) {
            const res = await DishesAPI.dishes();
            
            if (res && res.status === 200 && res.data) {
                commit('SET_PRODUCTS_TO_STATE', res.data);
            }

            return res;
        },

        async CREATE_DISH({commit}: {commit: Commit}, {title, description, categoryId, price} : {title: string, description: string, categoryId: string, price: number}) {
            const res = await DishesAPI.createDish(title, description, categoryId, price);
            if (res && res.status === 200 && res.data) {
                commit('SET_NEW_DISH', res.data);
            }
            
            return res;
        },

        async UPDATE_DISH({commit}: {commit : Commit}, {id, title, description} : {id: string, title: string, description: string}) {
            const res = await DishesAPI.updateDish(id, title, description);
            if (res && res.status === 200 && res.data) {
                commit('EDIT_DISH', {id, title, description});
            }

            return res;
        },

        async GET_ONE_DISH(_ : ActionContext<State, State>, id: string) {
            const res = await DishesAPI.dish(id);

            if (res && res.status === 200 && res.data) {
                return res.data;
            }

            return res;
        },

        async DELETE_DISH({commit}: {commit : Commit}, id: string) {
            const res = await DishesAPI.deleteDish(id);
            if (res && res.status === 200 && res.data) {
                commit('REMOVE_DISH', id);
            }

            return res;
        }
    },
    getters: {
        PRODUCTS(state : DishState): IDish[] {
            return state.dishes;
        },
    },
}