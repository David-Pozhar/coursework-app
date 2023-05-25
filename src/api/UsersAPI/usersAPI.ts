import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import { IUser } from '@/models/IUser';

export const UsersAPI = {
    users(currentPage: number, pageSize: number): Promise<AxiosResponse<IUser[]>> {
        const url = `/users?page=${currentPage}&pageSize=${pageSize}`;
        return DefaultAPIInstance.get(url);
    }
}