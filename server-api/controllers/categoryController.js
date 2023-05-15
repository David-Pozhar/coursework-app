import categoryService from '../services/categoryService.js';
import config from '../config.js';

const CategoryController = {};

CategoryController.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) - 1 || 0;
        const pageSize = parseInt(req.query.pageSize, 10) || config.DEFAULT_PAGE_SIZE;
        const categories = await categoryService.getAll(page, pageSize);
        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve categories',
        });
    }
};

CategoryController.getOne = async (req, res) => {
    try {
        const category = await categoryService.getOne(req.params.id);
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve categories',
        });
    }
};

CategoryController.remove = async (req, res) => {
    try {
        await categoryService
            .remove(req.params.id)
            .then(() => {
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({
                    message: 'Category not found',
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive categories',
        });
    }
};

CategoryController.create = async (req, res) => {
    try {
        const category = await categoryService.create(req.body);
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create category',
        });
    }
};

CategoryController.update = async (req, res) => {
    try {
        await categoryService.update(req.params.id, req.body);
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update category',
        });
    }
};

export default CategoryController;
