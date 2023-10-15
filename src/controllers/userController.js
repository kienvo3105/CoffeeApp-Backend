import userService from "../services/userService";
const asyncHandler = require("express-async-handler");


const register = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password } = req.body
    const response = await userService.createUser(email, phoneNumber, password);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response)
});

const getOneUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const response = await userService.handleGetOneUser(id);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);

})

const updateUser = asyncHandler(async (req, res) => {
    const response = await userService.updateUser(req.params.id, req.body);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);
})

const removeUser = asyncHandler(async (req, res) => {
    const response = await userService.removeUser(req.params.id);
    if (response.errorCode !== 0)
        return res.status(400).json(response);

    return res.status(201).json(response);
})


export default {
    register,
    getOneUser,
    updateUser,
    removeUser
}