import dishService from '../services/dishService.js';
import config from '../config.js';

const DishController = {};

// DishController.getLastTags = async (req, res) => {
//     try {
//         const posts = await DishModel.find().limit(5).exec();

//         const tags = posts
//             .map((obj) => obj.tags)
//             .flat()
//             .slice(0, 5);

//         res.json(tags);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Failed to get tags',
//         });
//     }
// };

DishController.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) - 1 || 0;
        const pageSize = parseInt(req.query.pageSize, 10) || config.DEFAULT_PAGE_SIZE;
        const category = req.query.category;
        const options = { page, pageSize, category };
        const dishes = await dishService.getAll(options);
        res.json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve dishes',
        });
    }
};

DishController.getOne = async (req, res) => {
    try {
        await dishService.getOne(req.params.id).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Dish not found',
                });
            }

            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to retrieve one dish',
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve dishes',
        });
    }
};

DishController.remove = async (req, res) => {
    try {
        await dishService.remove(req.params.id)
            .then(() => {
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({
                    message: 'Dish not found',
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive dishes',
        });
    }
};

DishController.create = async (req, res) => {
    try {
        const dish = await dishService.create(req.body, req.userId);
        res.json(dish);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create dish',
        });
    }
};

DishController.update = async (req, res) => {
    try {
        await dishService.update(req.params.id, req.body);
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update dish',
        });
    }
};

export default DishController;
