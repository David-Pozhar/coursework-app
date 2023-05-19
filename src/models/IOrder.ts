import { IUser } from "./IUser"
import { IDish } from "./IDish"

export interface OrderCreation {
    amount: number
    dishId: string
}

export interface OrderItem {
    dish: IDish
    amount: number
    price: number
    _id: string
}

export interface IOrder {
    user: IUser,
    orderItems: OrderItem[],
    totalPrice: number
    isPaid: boolean
    _id: string
    createdAt: string
    updatedAt: string
}