import db from "../models";
import addressService from "./addressService";

const createNewUserAddress = async (data, userId) => {
    const { userName, phoneNumber, address } = data;
    if (!userId || !userName || !phoneNumber)
        return { errorCode: 1, messageError: "lack of information!" };

    const checkUser = await db.User.findByPk(userId);
    if (checkUser === null)
        return { errorCode: 2, messageError: "user not found!" };

    const addressRes = await addressService.createNewAddress(address);
    if (addressRes.errorCode !== 0)
        return { errorCode: 1, messageError: "lack of information!" };
    await db.UserAddress.create({ UserId: userId, userName, phoneNumber, AddressId: addressRes.addressId });

    return { errorCode: 0, messageError: "ok" }
}

export default {
    createNewUserAddress
}