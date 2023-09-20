import userService from "../services/userService";
const asyncHandler = require("express-async-handler");


const register = asyncHandler(async (req, res) => {
    const respond = await userService.createUser(req.body);
    if (respond.error)
        return res.status(400).json(respond);

    return res.status(201).json(respond)
});

export default {
    register
}