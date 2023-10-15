const asyncHandler = require("express-async-handler");
import orderService from "../services/orderService";
const createNewOrder = asyncHandler(async (req, res) => {
    const response = await orderService.createNewOrder(req.body, req.params.id);

    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);

})

const getOrderByUser = asyncHandler(async (req, res) => {
    const response = await orderService.getOrderByUser(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);
})

const getOrderHistoryByUser = asyncHandler(async (req, res) => {
    const response = await orderService.getOrderHistoryByUser(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);
})

const getOrderDetailById = asyncHandler(async (req, res) => {
    const response = await orderService.getOrderDetailById(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);
})

const getOrderByBranch = asyncHandler(async (req, res) => {
    const response = await orderService.getOrderByBranch(req.params.branchId);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(200).json(response);
})

export default {
    createNewOrder,
    getOrderByUser,
    getOrderDetailById,
    getOrderByBranch,
    getOrderHistoryByUser
}