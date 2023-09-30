import userService from "../services/userService";
const asyncHandler = require("express-async-handler");


const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const response = await userService.userLogin(email, password);

    return res.status(201).json(response)
});

export default {
    userLogin
}