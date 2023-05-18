import { OrdersAPI } from "@/api/OrdersAPI/ordersAPI";
import { IOrder } from "@/models/IOrder";
import { Commit } from "vuex";

export interface OrderState {
    orders: IOrder[]
}

export const ordersModule = {
    namespaced: true,

    state(): OrderState {
        return {
            orders: []
        }
    },
    mutations : {
        SET_ORDERS_TO_STATE(state: OrderState, data: OrderState) {
            state.orders = data.orders;
        }
    },
    actions : {
        async GET_ORDERS_FROM_API({commit} : {commit: Commit}) {
            const res = await OrdersAPI.orders();
            if (res && res.status === 200 && res.data) {
                commit('SET_ORDERS_TO_STATE', res.data);
            }
            
            return res;
        }
    },
    getters: {
        ORDERS(state: OrderState) {
            return state.orders;
        }
    },
}