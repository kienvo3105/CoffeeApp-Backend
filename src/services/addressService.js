import db from '../models/index'


const createNewAddress = async (data) => {
    const { houseNumber, street, province, district, commune } = data;

    if (!houseNumber || !street || !province || !district || !commune)
        return { errorCode: 1, errorMessage: "lack of information address!" };



    const address = await db.Address.create({ ...data });

    return { errorCode: 0, errorMessage: "ok", addressId: address.id }
}

export default {
    createNewAddress
}