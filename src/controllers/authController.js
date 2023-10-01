import userService from "../services/userService";
import managerService from "../services/managerService";
import adminService from "../services/adminService";
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


const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await adminService.adminLogin(email, password, res);

    if (response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(200).json(response)

});

const adminRefresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    const response = await adminService.adminRefresh(cookies);

    if (response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(200).json(response)

});

const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    res.json({ message: "Cookie cleared" });
};

export default {
    userLogin,
    managerLogin,
    adminLogin,
    adminRefresh,
    logout
}