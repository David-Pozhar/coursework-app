import { LoginAPIInstance, DefaultAPIInstance } from '..';
import { AxiosResponse } from 'axios';
import { IDish } from '@/models/IDish';
import { IConfirm } from '@/models/IConfirm';

export const DishesAPI = {
    dishes(): Promise<AxiosResponse<IDish[]>> {
        const url = '/dishes';
        return LoginAPIInstance.get(url);
    },
    createDish(title: string, description: string, category: string, price: number): Promise<AxiosResponse<IDish>> {
        const url = '/dishes';
        const data = {title, description, category, price};
        return DefaultAPIInstance.post(url, data);
    },
    updateDish(id: string, title: string, description: string): Promise<AxiosResponse<IConfirm>> {
        const data = {title, description}
        const url = `dishes/${id}`;
        return DefaultAPIInstance.patch(url, data);
    },
    dish(id: string): Promise<AxiosResponse<IDish>> {
        const url = `dishes/${id}`;
        return DefaultAPIInstance.get(url);
    },
    deleteDish(id: string): Promise<AxiosResponse<IConfirm>> {
        const url = `dishes/${id}`;
        return DefaultAPIInstance.delete(url);
    }
}