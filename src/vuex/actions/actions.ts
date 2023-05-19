import {ICart} from '../../models/ICart';
import { Commit } from 'vuex';


export default {
    ADD_TO_CART({commit} : {commit: Commit}, product : ICart) {
        commit('SET_CART', product)
    },

    DELETE_FROM_CART({commit} : {commit: Commit}, index : number) {
        commit('DELETE_PRODUCT_FROM_CART', index)
    },
    INCREMENT_QUANTITY({commit} : {commit: Commit}, index : number) {
        commit('INCREMENT_QUANTITY', index)
    },
    DECREMENT_QUANTITY({commit} : {commit: Commit}, index : number) {
        commit('DECREMENT_QUANTITY', index)
    },
    DELETE_EVERYTHING_FROM_CART({commit} : {commit: Commit}) {
        commit('REMOVE_EVERYTHING_FROM_CART');
    }
}