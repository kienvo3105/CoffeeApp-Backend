import userService from "../services/userService";
const asyncHandler = require("express-async-handler");


const register = asyncHandler(async (req, res) => {
    const response = await userService.createUser(req.body);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
});

const getOneUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const response = await userService.handleGetOneUser(id);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)

})

export default {
    register,
    getOneUser
}