import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import { ICategory } from '@/models/ICategory';
import { IConfirm } from "@/models/IConfirm";


export const CategoryAPI = {
    categories(): Promise<AxiosResponse<ICategory[]>> {
        const url = '/categories';
        return LoginAPIInstance.get(url);
    },
    createCategory(title: string, description: string): Promise<AxiosResponse<ICategory>> {
        const url = '/categories';
        const data = {title, description};
        return DefaultAPIInstance.post(url, data);
    },
    updateCategory(id: string, title: string, description: string): Promise<AxiosResponse<IConfirm>> {
        const data = {title, description};
        const url = `categories/${id}`;
        return DefaultAPIInstance.patch(url, data);
    },
    category(id: string): Promise<AxiosResponse<ICategory>> {
        const url = `categories/${id}`;
        return DefaultAPIInstance.get(url);
    },
    deleteCategory(id: string): Promise<AxiosResponse<IConfirm>> {
        const url = `categories/${id}`;
        return DefaultAPIInstance.delete(url);
    }
}