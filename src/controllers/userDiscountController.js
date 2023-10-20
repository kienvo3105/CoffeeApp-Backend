const asyncHandler = require("express-async-handler");
import userService from "../services/userService";

const redeemDiscount = asyncHandler(async (req, res) => {
    const response = await userService.redeemDiscount(req.params.id, req.body.couponId, req.body.numberCoupon);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);
});

const getAllDiscountByUser = asyncHandler(async (req, res) => {
    const response = await userService.getAllDiscountByUser(req.params.id);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);

})

export default {
    redeemDiscount,
    getAllDiscountByUser
}