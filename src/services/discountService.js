import db from "../models";

const createNewDiscount = async (data) => {
    const { code, discount, expirationDate, image, releaseDate, costChange } = data;
    if (!code || !discount || !expirationDate || !image || !releaseDate || !costChange)
        return { errorCode: 1, errorMessage: "lack of information" }

    const newDiscount = await db.Discount.create({ ...data });
    return { errorCode: 0, errorMessage: "success create new discount with id: " + newDiscount.id }
}

const getAllDiscount = async () => {
    let discounts = await db.Discount.findAll();

    return { errorCode: 0, errorMessage: "ok", discounts }
}

const useDiscountById = async (discountId) => {
    await db.UserDiscount.update({ dateUsed: new Date() }, {
        where: {
            id: discountId,
        },
    });
    return { errorCode: 0, errorMessage: "ok" }
}

export default {
    createNewDiscount,
    getAllDiscount,
    useDiscountById
}