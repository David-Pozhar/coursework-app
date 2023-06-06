import CategoryModel from '../models/categoryModel.js';

const categoryService = {};

categoryService.getAll = async function (page, pageSize) {
    try {
        const totalCount = await CategoryModel.countDocuments().exec();
        const categories = await CategoryModel.find().limit(pageSize).skip(pageSize * page).exec();

        return { categories, totalCount };
    } catch (err) {
        throw Error('Error while getting all categories: ' + err);
    }
};

categoryService.getOne = async function (categoryId) {
    try {
        return await CategoryModel.findById(categoryId).exec();
    } catch (err) {
        throw Error('Error while retrieving one category: ' + err);
    }
};

categoryService.remove = async function (categoryId) {
    try {
        return await CategoryModel.findOneAndDelete({
            _id: categoryId,
        });
    } catch (err) {
        throw Error('Error while removing category: ' + err);
    }
};

categoryService.create = async function (body) {
    try {
        const doc = new CategoryModel({
            title: body.title,
            description: body.description || '',
        });

        return await doc.save();
    } catch (err) {
        throw Error('Error while creating category: ' + err);
    }
};

categoryService.update = async function (categoryId, body) {
    try {
        return await CategoryModel.updateOne(
            {
                _id: categoryId,
            },
            {
                title: body.title,
                description: body.description,
            }
        );
    } catch (err) {
        throw Error('Error while updating category: ' + err);
    }
};

export default categoryService;
