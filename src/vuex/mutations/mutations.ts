import State from '../store'
import {ICart} from '../../models/ICart';

export default {
    SET_CART: (state : State, product : ICart) => {
        if (state.cart.length) {
            let productExists = false
            state.cart.map(item => {
                if (item._id === product._id) {
                    item.quantity++
                    productExists = true
                }
            })
            if (!productExists) {
                state.cart.push(product);
            }
        } else {
            state.cart.push(product);
        }    
    },
    
    DELETE_PRODUCT_FROM_CART: (state : State, index: number) => {
        state.cart.splice(index, 1)
    },
    INCREMENT_QUANTITY: (state : State, index: number) => {
        state.cart[index].quantity += 1
    },
    DECREMENT_QUANTITY: (state : State, index: number) => {
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity -= 1
        }
    }
}