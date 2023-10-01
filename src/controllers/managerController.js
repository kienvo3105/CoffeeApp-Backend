const asyncHandler = require("express-async-handler");
import managerService from "../services/managerService";

const createNewManager = asyncHandler(async (req, res) => {
    // const response = req.body
    const response = await managerService.createManager(req.body)

    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
});

const getAllManager = asyncHandler(async (req, res) => {
    // console.log('get all managers')
    const response = await managerService.handleGetAllManager();
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
})

export default {
    createNewManager,
    getAllManager

}