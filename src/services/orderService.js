import db from "../models";
import orderDetail from "../models/orderDetail";
import product from "../models/product";

const createNewOrder = async (data, userId) => {
    const checkUser = await db.User.findByPk(userId);
    if (checkUser === null)
        return { errorCode: 2, messageError: "user not found!" };


    const { addressUserId, branchId, price, quantity, discount, finalPrice, noted, deliveryMethod, products } = data;
    if (!products || !branchId || !price || !quantity || !finalPrice || !deliveryMethod || !((deliveryMethod === "vc" && addressUserId) || deliveryMethod !== "vc"))
        return { errorCode: 1, messageError: "lack of information!" }

    const order = await db.Order.create({
        addressUserId,
        branchId,
        userId,
        price,
        quantity,
        discount,
        finalPrice,
        noted,
        statusId: "t1",
        deliveryMethod,
        orderDate: new Date(),
    })


    await db.OrderDetail.bulkCreate(
        products.map(product => (
            {
                ...product,
                orderId: order.id
            }
        )))

    return { errorCode: 0, messageError: "ok" }

}

export default {
    createNewOrder
}