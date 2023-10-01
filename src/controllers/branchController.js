const asyncHandler = require("express-async-handler");
import branchService from "../services/branchService";

const getAllBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok getAllBranch" })
});

const createNewBranch = asyncHandler(async (req, res) => {
    // const response = req.body
    const response = await branchService.createNewBranch(req.body);

    return res.status(201).json(response)
});

const getOneBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok getOneBranch" })
});

const updateBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok updateBranch" })
});

const deleteBranch = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok deleteBranch" })
});

export default {
    getAllBranch,
    createNewBranch,
    getOneBranch,
    deleteBranch,
    updateBranch
}