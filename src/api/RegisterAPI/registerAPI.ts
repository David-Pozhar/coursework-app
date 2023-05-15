import { LoginAPIInstance, DefaultAPIInstance } from "..";
import { AxiosResponse } from "axios";

interface Register {
    token: string | null
    userRole: string | null
}

export const RegisterAPI = {
    register(fullName: string, email: string, password: string): Promise<AxiosResponse<Register>> {
        const url = '/auth/register'
        const data = {fullName, email, password}
        return LoginAPIInstance.post(url, data)
    }
}