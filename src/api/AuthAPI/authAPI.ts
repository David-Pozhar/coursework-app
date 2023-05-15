import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";
import {IUser} from '../../models/IUser'

export const AuthAPI = {
    login(email: string, password: string): Promise<AxiosResponse<IUser>> {
        const url = '/auth/login'
        const data = {email, password}
        return LoginAPIInstance.post(url, data)
    },
    getUserByToken(): Promise<AxiosResponse<IUser>> {
        const url = '/auth/me'
        return DefaultAPIInstance.get(url)
    }
}