import userService from "../services/userService";
const asyncHandler = require("express-async-handler");


const userLogin = asyncHandler(async (req, res) => {
    // const respond = await userService.createUser(req.body);
    // if (respond.error)
    //     return res.status(400).json(respond);

    const { email, password } = req.body;

    const response = await userService.userLogin(email, password);

    return res.status(201).json(response)
});

export default {
    userLogin
}