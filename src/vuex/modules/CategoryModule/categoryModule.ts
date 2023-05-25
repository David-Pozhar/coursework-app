import { ICategory } from "@/models/ICategory"
import { ActionContext, Commit } from "vuex"
import { CategoryAPI } from "@/api/CategoryAPI/categoryAPI"
import State from '../../store'
import { AxiosResponse } from "axios"

interface CategoryState {
    categories: ICategory[]
}

export const categoryModule = {
    namespaced: true,

    state(): CategoryState {
        return {
            categories: []
        }
    },
    getters: {
        CATEGORIES(state: CategoryState) {
            return state.categories;
        },
    },
    mutations: {
        SET_CATEGORIES_TO_STATE(state: CategoryState, {res, extraCategory} : {res: AxiosResponse<CategoryState>, extraCategory: boolean}) {
            if (extraCategory) {
                const allCategory = {
                    _id: '1',
                    title: 'Select Category',
                    description: '',
                    createdAt: '2023-05-02T11:17:26.623Z',
                    updatedAt: '2023-05-02T11:17:26.623Z'
                }
                res.data.categories.unshift(allCategory);
            }   
            state.categories = res.data.categories;
        },
        SET_NEW_CATEGORY(state: CategoryState, data: ICategory) {
            state.categories.push(data);
        },
        EDIT_CATEGORY(state: CategoryState, {id, title, description} : {id: string, title: string, description: string}) {
            const editableCategory = state.categories.find(({_id}) => _id === id);
            if (editableCategory) {
                editableCategory.title = title;
                editableCategory.description = description;
            }
        },
        REMOVE_CATEGORY(state: CategoryState, id: string) {
            const index = state.categories.findIndex(category => category._id === id);
            
            if (index) {
                state.categories.splice(index, 1);
            }
        }
    },
    actions: {
        async GET_CATEGORIES_FROM_API_WITH_PAGINATION({commit} : {commit: Commit}, {currentPage, pageSize, extraCategory} : {currentPage: number, pageSize: number, extraCategory : boolean}) {
            const res = await CategoryAPI.categories(currentPage, pageSize);
            if (res && res.status === 200 && res.data) {
                commit('SET_CATEGORIES_TO_STATE', {res, extraCategory});
            }

            return res.data;
        },

        async GET_CATEGORIES_FROM_API({commit} : {commit: Commit}, extraCategory: boolean) {
            const res = await CategoryAPI.categories();
            if (res && res.status === 200 && res.data) {
                commit('SET_CATEGORIES_TO_STATE', {res, extraCategory});
            }

            return res.data;
        },

        async CREATE_CATEGORY({commit}: {commit: Commit}, {title, description} : {title: string, description: string}) {
            const res = await CategoryAPI.createCategory(title, description);
            if (res && res.status === 200 && res.data) {
                commit('SET_NEW_CATEGORY', res.data);
            }
            
            return res;
        },

        async UPDATE_CATEGORY({commit}: {commit : Commit}, {id, title, description} : {id: string, title: string, description: string}) {
            const res = await CategoryAPI.updateCategory(id, title, description);
            if (res && res.status === 200 && res.data) {
                commit('EDIT_CATEGORY', {id, title, description});
            }

            return res;
        },

        async GET_ONE_CATEGORY(_ : ActionContext<State, State>, id: string) {
            const res = await CategoryAPI.category(id);

            if (res && res.status === 200 && res.data) {
                return res.data;
            }

            return res;
        },

        async DELETE_CATEGORY({commit}: {commit : Commit}, id: string) {
            const res = await CategoryAPI.deleteCategory(id);
            if (res && res.status === 200 && res.data) {
                commit('REMOVE_CATEGORY', id);
            }

            return res;
        }
    }
}