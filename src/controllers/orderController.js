const asyncHandler = require("express-async-handler");
import orderService from "../services/orderService";
const createNewOrder = asyncHandler(async (req, res) => {
    const response = await orderService.createNewOrder(req.body, req.params.id);

    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

export default {
    createNewOrder
}