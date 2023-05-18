import { IUser } from "./IUser"

interface orderItem {
    dish: string
    amount: number
    price: number
    _id: string
}

export interface IOrder {
    user: IUser,
    orderItems: orderItem[],
    totalPrice: number
    isPaid: boolean
    _id: string
    createdAt: string
    updatedAt: string
}