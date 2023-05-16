import { ICategory } from "@/models/ICategory"
import { ActionContext, Commit } from "vuex"
import { CategoryAPI } from "@/api/CategoryAPI/categoryAPI"
import State from '../../store'

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
        SET_CATEGORIES_TO_STATE(state: CategoryState, data: CategoryState) {
            const allCategory = {
                _id: '0',
                title: 'Select Category',
                description: '',
                createdAt: '2023-05-02T11:17:26.623Z',
                updatedAt: '2023-05-02T11:17:26.623Z'
            }
            data.categories.unshift(allCategory);
            state.categories = data.categories;
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
        }
    },
    actions: {
        async GET_CATEGORIES_FROM_API({commit} : {commit: Commit}) {
            const res = await CategoryAPI.categories();
            if (res && res.status === 200 && res.data) {
                commit('SET_CATEGORIES_TO_STATE', res.data);
            }

            return res;
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
        }
    }
}