import db from "../models";
const { Op } = require("sequelize");


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

const getOrderByUser = async (userId) => {
    const checkUser = await db.User.findByPk(userId);
    if (checkUser === null)
        return { errorCode: 2, messageError: "user not found!" };

    const orders = await db.Order.findAll({
        where: {
            userId: userId,
            statusId: {
                [Op.ne]: 't3'
            }
        },
        order: [['statusId', 'DESC'], ['orderDate', 'DESC']],
        include: [
            {
                model: db.Branch,
                attributes: {
                    exclude: ['addressId', 'managerId']
                }
            },
            { model: db.OrderStatus }
        ],
        attributes: {
            exclude: ['OrderStatusId', 'UserAddressAddressId', 'UserId', 'BranchId', 'branchId', 'statusId', 'userId', 'addressUserId']
        },
        nest: true,
        raw: true,
    })

    return { errorCode: 0, messageError: "ok!", orders };


}

const getOrderHistoryByUser = async (userId) => {
    const checkUser = await db.User.findByPk(userId);
    if (checkUser === null)
        return { errorCode: 2, messageError: "user not found!" };

    const orders = await db.Order.findAll({
        where: {
            userId: userId,
            statusId: 't3'
        },
        order: [['orderDate', 'DESC']],
        include: [
            {
                model: db.Branch,
                attributes: {
                    exclude: ['addressId', 'managerId']
                }
            },
            { model: db.OrderStatus }
        ],
        attributes: {
            exclude: ['OrderStatusId', 'UserAddressAddressId', 'UserId', 'BranchId', 'branchId', 'statusId', 'userId', 'addressUserId']
        },
        nest: true,
        raw: true,
    })

    return { errorCode: 0, messageError: "ok!", orders };
}


const getOrderDetailById = async (orderId) => {
    const checkOrder = await db.Order.findByPk(orderId, {
        attributes: {
            exclude: ['OrderStatusId', 'UserAddressAddressId', 'UserId', 'BranchId']
        },
    });
    if (checkOrder === null)
        return { errorCode: 2, messageError: "order not found!" };

    const orderDetails = await db.OrderDetail.findAll({
        where: {
            orderId: orderId
        },
        include: [
            {
                model: db.Product,
                attributes: {
                    exclude: ['CategoryId']
                },
            },
            {
                model: db.Size,
            },
        ],
        attributes: {
            exclude: ['OrderId', 'ProductId', 'SizeId', 'sizeId', 'orderId', 'productId']
        },
        nest: true,
        raw: true,
    })

    return { errorCode: 0, messageError: "ok!", orderDetails };
}




const getOrderByBranch = async (branchId) => {
    const checkBranch = await db.Branch.findByPk(branchId);
    if (checkBranch === null)
        return { errorCode: 2, messageError: "branch not found!", branchId };

    const orders = await db.Order.findAll({
        where: { branchId },
        include: [
            {
                model: db.OrderStatus,
            },
            {
                model: db.User,
                include: [{
                    model: db.Address
                }],
                attributes: {
                    exclude: ["password", 'coins', 'amountSpent', 'membershipClass']
                }
            },
        ],
        attributes: {
            exclude: ['OrderStatusId', 'UserAddressAddressId', 'UserId', 'BranchId', 'addressUserId', 'branchId', 'userId', 'statusId']
        },
        nest: true,
        raw: true,
    });

    const orderPromises = orders.map(async (order) => {
        const detail = await getOrderDetailById(order.id);
        if (detail.errorCode === 0) {
            order.orderDetails = detail.orderDetails;
            return order;
        } else {
            return { errorCode: 1, messageError: "error get orderDetail" };
        }
    });

    const processedOrders = await Promise.all(orderPromises);

    return { errorCode: 0, messageError: "ok!", orders: processedOrders };
}

export default {
    createNewOrder,
    getOrderByUser,
    getOrderDetailById,
    getOrderByBranch,
    getOrderHistoryByUser
}