import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import { IOrder } from "@/models/IOrder";

export const OrdersAPI = {
    orders(): Promise<AxiosResponse<IOrder[]>> {
        const url = '/orders';
        return DefaultAPIInstance.get(url);
    }
}