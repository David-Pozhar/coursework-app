import State from '../store'
import { IDish } from '@/models/IDish';
import { ICart } from '@/models/ICart';

export default {
    CART(state : State): ICart[] {
        return state.cart;
    }
}