const asyncHandler = require("express-async-handler");
import branchService from "../services/branchService";

const getAllBranch = asyncHandler(async (req, res) => {
    const response = await branchService.getAllBranch();
    return res.status(201).json(response)
});

const createNewBranch = asyncHandler(async (req, res) => {
    // const response = req.body
    const response = await branchService.createNewBranch(req.body);

    return res.status(201).json(response)
});

const updateBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok updateBranch" })
});

const deleteBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok deleteBranch" })
});

const searchBranch = asyncHandler(async (req, res) => {
    const response = await branchService.searchBranch(req.query.keyword);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(201).json(response);
})

const getBranchById = asyncHandler(async (req, res) => {
    const response = await branchService.getBranchById(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(201).json(response);
})

const getRevenueMonthByBranch = asyncHandler(async (req, res) => {
    const response = await branchService.getRevenueMonthByBranch(req.params.id);
    if (response.errorCode !== 0)
        return res.status(401).json(response);
    return res.status(201).json(response);
})

export default {
    getAllBranch,
    createNewBranch,
    deleteBranch,
    updateBranch,
    searchBranch,
    getBranchById,
    getRevenueMonthByBranch
}