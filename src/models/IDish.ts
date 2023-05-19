export interface IDish {
    _id: string
    title: string
    description: string
    imageUrl?: string
    price: number,
    category: {
        _id: string,
        title: string,
    },
}