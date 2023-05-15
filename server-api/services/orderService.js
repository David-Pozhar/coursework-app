import OrderModel from '../models/orderModel.js';
import dishService from '../services/dishService.js';

const orderService = {};

orderService.getAll = async function (options) {
    try {
        const cond = options.isAdmin ? {} : { user: options.authUserId };

        // if user parameter is present and authuser is isAdmin - get all orders by user creator
        if (options.isAdmin && options.user) {
            cond.user = options.user;
        }

        const totalCount = await OrderModel.countDocuments(cond).exec();
        const orders = await OrderModel.find(cond)
            .sort({ createdAt: -1 })
            .limit(options.pageSize)
            .skip(options.pageSize * options.page)
            .populate([
                {
                    path: 'orderItems',
                    populate: {
                        path: 'dish',
                        model: 'Dish',
                    },
                },
                'user',
            ])
            .exec();

        return { orders, totalCount };
    } catch (err) {
        throw Error('Error while getting all orders: ' + err);
    }
};

orderService.getOne = async function (options) {
    try {
        const cond = { _id: options.orderId };
        if (!options.isAdmin) {
            cond.user = options.authUserId
        }
        
        return await OrderModel.findOne(cond)
            .populate([
                {
                    path: 'orderItems',
                    populate: {
                        path: 'dish',
                        model: 'Dish',
                    },
                },
                {
                    path: 'orderItems.dish',
                    populate: {
                        path: 'category',
                        model: 'Category',
                    },
                },
                'user',
            ])
            .exec();
    } catch (err) {
        throw Error('Error while retrieving one order: ' + err);
    }
};

orderService.remove = async function (orderId) {
    try {
        return await OrderModel.findOneAndDelete({
            _id: orderId,
        });
    } catch (err) {
        throw Error('Error while removing order: ' + err);
    }
};

orderService.create = async function (body, userId) {
    try {
        let totalPrice = 0;
        let items = [];

        await Promise.all(
            body.orderItems.map(async (item) => {
                try {
                    const dish = await dishService.getOne(item.dishId, true);
                    totalPrice += item.amount * dish._doc.price;

                    items.push({
                        amount: item.amount || 1,
                        price: dish._doc.price || 0,
                        dish: item.dishId,
                    });
                } catch (error) {
                    console.log('Error while retrieving all items from order: ' + error);
                }
            })
        );

        const doc = new OrderModel({
            user: userId,
            isPaid: false,
            totalPrice: totalPrice,
            orderItems: items,
        });

        return await doc.save();
    } catch (err) {
        throw Error('Error while creating order: ' + err);
    }
};

orderService.update = async function (orderId, body) {
    try {
        return await OrderModel.updateOne(
            {
                _id: orderId,
            },
            {
                isPaid: body.isPaid,
                paidAt: new Date(),
            }
        );
    } catch (err) {
        throw Error('Error while updating order: ' + err);
    }
};

export default orderService;
