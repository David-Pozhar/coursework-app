export interface IDish {
    _id: number
    title: string
    description: string
    imageUrl: string
    price: number,
    category: {
        _id: string,
    },
}