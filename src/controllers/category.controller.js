import { getCategories } from "../services/category.service.js";

export const getCategoriesController = async (req, res, next) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};