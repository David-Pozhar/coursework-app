import { Commit } from 'vuex';
import { IDish } from '@/models/IDish';
import { ICart } from '@/models/ICart';

export default interface CartState {
    products: IDish[],
    cart: ICart[]
}

export const cartModule = {
    namespaced: true,

    state(): CartState {
        return {
            products: [],
            cart: []
        }
    },
    mutations : {
        SET_CART: (state : CartState, product : ICart) => {
            if (state.cart.length) {
                let productExists = false;
                state.cart.map(item => {
                    if (item._id === product._id) {
                        item.quantity++;
                        productExists = true;
                    }
                })
                if (!productExists) {
                    state.cart.push(product);
                }
            } else {
                state.cart.push(product);
            }    
        },
        
        DELETE_PRODUCT_FROM_CART: (state : CartState, index: number) => {
            state.cart.splice(index, 1);
        },
        REMOVE_EVERYTHING_FROM_CART: (state: CartState) => {
            state.cart = [];
        },
        INCREMENT_QUANTITY: (state : CartState, index: number) => {
            state.cart[index].quantity += 1;
        },
        DECREMENT_QUANTITY: (state : CartState, index: number) => {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity -= 1;
            }
        }
    },
    actions : {
        ADD_TO_CART({commit} : {commit: Commit}, product : ICart) {
            commit('SET_CART', product);
        },
        DELETE_FROM_CART({commit} : {commit: Commit}, index : number) {
            commit('DELETE_PRODUCT_FROM_CART', index);
        },
        INCREMENT_QUANTITY({commit} : {commit: Commit}, index : number) {
            commit('INCREMENT_QUANTITY', index);
        },
        DECREMENT_QUANTITY({commit} : {commit: Commit}, index : number) {
            commit('DECREMENT_QUANTITY', index);
        },
        DELETE_EVERYTHING_FROM_CART({commit} : {commit: Commit}) {
            commit('REMOVE_EVERYTHING_FROM_CART');
        }
    },
    getters: {
        CART(state : CartState): ICart[] {
            return state.cart;
        }
    },
}