const asyncHandler = require("express-async-handler");
import revenueService from "../services/revenueService";


const getRevenueMonthByBranch = asyncHandler(async (req, res) => {
    const response = await revenueService.getRevenueMonthByBranch(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(201).json(response);
});

export default {
    getRevenueMonthByBranch,
};