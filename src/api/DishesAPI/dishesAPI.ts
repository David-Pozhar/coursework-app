import { LoginAPIInstance, DefaultAPIInstance } from '..';
import { AxiosResponse } from 'axios';
import { IDish } from '@/models/IDish';

export const DishesAPI = {
    dishes(): Promise<AxiosResponse<IDish[]>> {
        const url = '/dishes';
        return LoginAPIInstance.get(url);
    }
}