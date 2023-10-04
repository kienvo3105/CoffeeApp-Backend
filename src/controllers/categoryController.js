const asyncHandler = require("express-async-handler");
import categoryService from "../services/categoryService";

const createNewCategory = asyncHandler(async (req, res) => {
    const response = await categoryService.createNewCategory(req.body);

    if (response && response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(200).json(response);
});

const getAllCategory = asyncHandler(async (req, res) => {
    const response = await categoryService.getAllCategory();

    if (response && response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(200).json(response);
});


const getOneCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const response = await categoryService.getOneCategory(id);

    if (response && response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(200).json(response);
});

export default {
    getAllCategory,
    createNewCategory,
    getOneCategory
}