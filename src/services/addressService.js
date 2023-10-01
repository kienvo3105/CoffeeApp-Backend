import db from '../models/index'


const createNewAddress = async (data) => {
    // const { houseNumber, street, longitude, latitude, province, district, commune } = data;
    const address = await db.Address.create({ ...data });

    return { errorCode: 0, errorMessage: "ok", addressId: address.id }
}

export default {
    createNewAddress
}