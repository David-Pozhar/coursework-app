import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import { IUser } from '@/models/IUser';

export const UsersAPI = {
    users(): Promise<AxiosResponse<IUser[]>> {
        const url = '/users';
        return DefaultAPIInstance.get(url);
    }
}