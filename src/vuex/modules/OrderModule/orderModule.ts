import { OrdersAPI } from "@/api/OrdersAPI/ordersAPI";
import { IOrder, OrderCreation } from "@/models/IOrder";
import State from "@/vuex/store";
import { ActionContext, Commit } from "vuex";

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
        },
        EDIT_ORDER(state: OrderState, {id, isPaid} : {id: string, isPaid: boolean}) {
            const editableOrder = state.orders.find(({_id}) => _id === id);
            if (editableOrder) {
                editableOrder.isPaid = isPaid;
            }
        }
    },
    actions : {
        async GET_ORDERS_FROM_API({commit} : {commit: Commit}, {currentPage, pageSize}: {currentPage: number, pageSize: number}) {
            const res = await OrdersAPI.orders(currentPage, pageSize);
            if (res && res.status === 200 && res.data) {
                commit('SET_ORDERS_TO_STATE', res.data);
            }
            
            return res.data;
        },
        async GET_USER_ORDERS({commit} : {commit: Commit}, {currentPage, pageSize, userId} : {currentPage: number, pageSize: number, userId: string}) {
            const res = await OrdersAPI.orders(currentPage, pageSize, userId);
            if (res && res.status === 200 && res.data) {
                commit('SET_ORDERS_TO_STATE', res.data);
                return res.data;
            }
            return res;
        },
        async CREATE_ORDER({commit} : {commit: Commit}, {orderItems}: {orderItems: OrderCreation[]}) {
            return await OrdersAPI.createOrder(orderItems);
        },
        async UPDATE_ORDER({commit}: {commit : Commit}, {id, isPaid} : {id: string, isPaid: boolean}) {
            const res = await OrdersAPI.updateOrder(id, isPaid);
            if (res && res.status === 200 && res.data) {
                commit('EDIT_ORDER', {id, isPaid});
            }

            return res;
        },
        async GET_ONE_ORDER(_ : ActionContext<State, State>, {id} : {id: string}) {
            const res = await OrdersAPI.order(id);

            if (res && res.status === 200 && res.data) {
                return res.data;
            }

            return res;
        },
    },
    getters: {
        ORDERS(state: OrderState) {
            return state.orders;
        }
    },
}