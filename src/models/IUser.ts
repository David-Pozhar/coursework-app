export interface IUser {
    _id: string,
    fullName: string,
    email: string,
    isAdmin: boolean | null,
    token: string | null,
    createdAt: string,
    updatedAt: string
}