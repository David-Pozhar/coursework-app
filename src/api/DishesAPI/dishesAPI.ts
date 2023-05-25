import { LoginAPIInstance, DefaultAPIInstance, UploadAPIInstance } from '..';
import { AxiosResponse } from 'axios';
import { IDish } from '@/models/IDish';
import { IConfirm } from '@/models/IConfirm';
import FormData from 'form-data';

export const DishesAPI = {
    dishes(currentPage?: number, pageSize?: number): Promise<AxiosResponse<IDish[]>> {
        const url = `/dishes?page=${currentPage}&pageSize=${pageSize}`;
        return LoginAPIInstance.get(url);
    },
    createDish(title: string, description: string, imageUrl: string, category: string, price: number): Promise<AxiosResponse<IDish>> {
        const url = '/dishes';
        const data = {title, description, imageUrl, category, price};
        return DefaultAPIInstance.post(url, data);
    },
    updateDish(id: string, title: string, description: string, imageUrl: string, price: number, category: string): Promise<AxiosResponse<IConfirm>> {
        const data = {title, description, imageUrl, price, category};
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
    },
    uploadImage(inputName: string, file: File): Promise<AxiosResponse<String>> {
        const formData = new FormData();
        formData.append(inputName, file);
        const url = '/upload-dish';
        return UploadAPIInstance.post(url, formData);
    }
}