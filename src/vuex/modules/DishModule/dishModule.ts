import { Commit, ActionContext } from 'vuex';
import {DishesAPI} from '@/api/DishesAPI/dishesAPI';
import { IDish } from '@/models/IDish';
import State from '@/vuex/store';
import { ImageUpload } from '@/types/types';

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
        EDIT_DISH(state: DishState, {id, title, description, imageUrl, price, categoryId} : {id: string, title: string, description: string, imageUrl: string, price: number, categoryId: string}) {
            let editableDish = state.dishes.find(({_id}) => _id === id);
            if (editableDish) {
                editableDish = {
                    ...editableDish,
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    price: price,
                    category: {
                        ...editableDish.category, 
                        _id: categoryId,
                    }

                }
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
        async GET_PRODUCTS_FROM_API_WITH_PAGINATION({commit}: {commit: Commit}, {currentPage, pageSize}: {currentPage: number, pageSize: number}) {
            const res = await DishesAPI.dishes(currentPage, pageSize);
            
            if (res && res.status === 200 && res.data) {
                commit('SET_PRODUCTS_TO_STATE', res.data);
            }

            return res.data;
        },

        async GET_PRODUCTS_FROM_API({commit}: {commit: Commit}) {
            const res = await DishesAPI.dishes();
            
            if (res && res.status === 200 && res.data) {
                commit('SET_PRODUCTS_TO_STATE', res.data);
            }

            return res.data;
        },

        async CREATE_DISH({commit}: {commit: Commit}, {title, description, imageUrl, categoryId, price}: {title: string, description: string, imageUrl: string, categoryId: string, price: number}) {
            const res = await DishesAPI.createDish(title, description, imageUrl, categoryId, price);
            if (res && res.status === 200 && res.data) {
                commit('SET_NEW_DISH', res.data);
            }
            
            return res;
        },

        async UPDATE_DISH({commit}: {commit: Commit}, {id, title, description, imageUrl, price, categoryId}: {id: string, title: string, description: string, imageUrl: string, price: number, categoryId: string}) {
            const res = await DishesAPI.updateDish(id, title, description, imageUrl, price, categoryId);
            if (res && res.status === 200 && res.data) {
                commit('EDIT_DISH', {id, title, description, imageUrl, price, categoryId});
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

        async DELETE_DISH({commit}: {commit: Commit}, id: string) {
            const res = await DishesAPI.deleteDish(id);
            if (res && res.status === 200 && res.data) {
                commit('REMOVE_DISH', id);
            }

            return res;
        },

        async UPLOAD_IMAGE({commit}: {commit: Commit}, imageData: ImageUpload ) {
            const res = await DishesAPI.uploadImage(imageData.name, imageData.image);
            if (res && res.status === 200 && res.data) {
                return res.data;
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