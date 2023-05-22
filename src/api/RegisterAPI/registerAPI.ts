import { IUser } from "@/models/IUser";
import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";

export const RegisterAPI = {
    register(fullName: string, email: string, password: string, isAdmin: boolean): Promise<AxiosResponse<IUser>> {
        const url = '/auth/register';
        const data = {fullName, email, password, isAdmin};
        return LoginAPIInstance.post(url, data);
    }
}