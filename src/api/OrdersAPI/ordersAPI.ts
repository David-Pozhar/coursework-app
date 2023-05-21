import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import { IOrder, OrderCreation} from "@/models/IOrder";
import { IConfirm } from "@/models/IConfirm";

export const OrdersAPI = {
    orders(userId?: string): Promise<AxiosResponse<IOrder[]>> {
        const url = '/orders';
        const queryParams = userId ? {params: {user: userId}} : undefined;
        return DefaultAPIInstance.get(url, queryParams);
    },
    createOrder(orderItems: OrderCreation[]): Promise<AxiosResponse<IOrder>> {
        const url = 'orders';
        return DefaultAPIInstance.post(url, {orderItems});
    },
    order(id: string): Promise<AxiosResponse<IOrder>> {
        const url = `orders/${id}`;
        return DefaultAPIInstance.get(url);
    },
    updateOrder(id: string, isPaid: boolean): Promise<AxiosResponse<IConfirm>> {
        const url = `orders/${id}`;
        return DefaultAPIInstance.patch(url, {isPaid});
    },
}