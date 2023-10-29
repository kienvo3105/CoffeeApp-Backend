const asyncHandler = require("express-async-handler");
import discountService from "../services/discountService"

const createNewDiscount = asyncHandler(async (req, res) => {
    const response = await discountService.createNewDiscount(req.body);

    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
})

const getAllDiscount = asyncHandler(async (req, res) => {
    const response = await discountService.getAllDiscount();

    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
})

const useDiscountById = asyncHandler(async (req, res) => {
    console.log("🚀 ~ file: discountController.js:24 ~ useDiscountById ~ req.params.id:", req.params.id)
    const response = await discountService.useDiscountById(req.params.id);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);
})

export default {
    createNewDiscount,
    getAllDiscount,
    useDiscountById
}