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

export default {
    createNewDiscount,
    getAllDiscount
}