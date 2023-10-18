const asyncHandler = require("express-async-handler");
import userAddressService from "../services/userAddressService";

const createNewUserAddress = asyncHandler(async (req, res) => {
    const response = await userAddressService.createNewUserAddress(req.body, req.params.id);

    if (response.errorCode !== 0)
        return res.status(401).json(response);

    return res.status(201).json(response);
})


export default {
    createNewUserAddress
}