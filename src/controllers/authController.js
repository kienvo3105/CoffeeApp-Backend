import userService from "../services/userService";
import managerService from "../services/managerService";
const asyncHandler = require("express-async-handler");


const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const response = await userService.userLogin(email, password);

    return res.status(201).json(response)
});

const managerLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const response = await managerService.managerLogin(email, password);

    return res.status(201).json(response)
});
export default {
    userLogin,
    managerLogin
}