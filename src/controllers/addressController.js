const asyncHandler = require("express-async-handler");
import AddressService from "../services/addressService";

const getAllAddress = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok getAllAddress" })
});

const createNewAddress = asyncHandler(async (req, res) => {
    // const response = req.body
    const response = await AddressService.createNewAddress(req.body);

    return res.status(201).json(response)
});

const getOneAddress = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok getOneAddress" })
});

const updateAddress = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok updateAddress" })
});

const deleteAddress = asyncHandler(async (req, res) => {


    return res.status(201).json({ message: "ok deleteAddress" })
});

export default {
    getAllAddress,
    createNewAddress,
    getOneAddress,
    deleteAddress,
    updateAddress
}