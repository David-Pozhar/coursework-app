import DishModel from '../models/dishModel.js';

const dishService = {};

dishService.getAll = async function (options) {
    try {
        const cond = {};
        if (options.category) {
            cond.category = options.category;
        }
        
        const totalCount = await DishModel.countDocuments(cond).exec();
        const dishes = await DishModel.find(cond).limit(options.pageSize).skip(options.pageSize * options.page).populate(['category', 'adminCreator']).exec();

        return { dishes, totalCount };
    } catch (err) {
        throw Error('Error while getting all dishes: ' + err);
    }
};

dishService.getOne = async function (dishId, noUpdateViews) {
    try {
        return noUpdateViews ? await DishModel.findById(dishId).populate(['category', 'adminCreator']).exec()
        : await DishModel.findOneAndUpdate(
            {
                _id: dishId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        ).populate(['category', 'adminCreator']);
    } catch (err) {
        throw Error('Error while retrieving one dish: ' + err);
    }
};

dishService.remove = async function (dishId) {
    try {
        return await DishModel.findOneAndDelete({
            _id: dishId,
        });
    } catch (err) {
        throw Error('Error while removing dish: ' + err);
    }
};

dishService.create = async function (body, userId) {
    try {
        const doc = new DishModel({
            title: body.title,
            description: body.description,
            price: body.price,
            category: body.category,
            imageUrl: body.imageUrl,
            // tags: body.tags.split(','),
            adminCreator: userId
        });

        return await doc.save();
    } catch (err) {
        throw Error('Error while creating dish: ' + err);
    }
};

dishService.update = async function (dishId, body) {
    try {
        return await DishModel.updateOne(
            {
                _id: dishId,
            },
            {
                title: body.title,
                description: body.description,
                price: body.price,
                category: body.category,
                imageUrl: body.imageUrl,
                // tags: body.tags.split(',')
            }
        );
    } catch (err) {
        throw Error('Error while updating dish: ' + err);
    }
};

export default dishService;
