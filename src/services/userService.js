import db from '../models/index'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');

const createUser = async (email, phoneNumber, password) => {
    if (!email || !password || !phoneNumber)
        return { errorCode: 1, message: "email, password, phoneNumber are required!" };

    const hashPassword = await bcrypt.hash(password, 10);
    const [user, checkEmail] = await db.User.findOrCreate({
        where: { email: email },
        defaults: {
            email: email,
            password: hashPassword,
            firstName: null,
            lastName: null,
            phoneNumber: phoneNumber,
            coins: 0,
            amountSpent: 0,
            membershipClass: "BẠC"
        }
    });
    if (!checkEmail)
        return { errorCode: 2, message: "email is existed" }

    return { errorCode: 0, message: `${email} register successfully`, userId: user.id }
};

const userLogin = async (email, password) => {
    if (!email || !password) {
        return {
            errorCode: 1,
            errMessage: "Email and password are required"
        };
    }

    const isExist = await checkEmail(email);
    if (isExist) {
        //user exist
        const user = await db.User.findOne({
            where: { email: email },
            // raw: true
        });
        if (user) {
            // check password
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const accessToken = jwt.sign(
                    {
                        Info: {
                            id: user.id,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                // delete user.password
                return {
                    errorCode: 0,
                    errMessage: "ok",
                    token: accessToken,
                    userId: user.id
                };
            } else {
                return {
                    errorCode: 3,
                    errMessage: "Wrong password"
                };
            }

        }
    }
    return {
        errorCode: 2,
        errMessage: "Your's email isn't exist"
    };

}

const checkEmail = async (email) => {
    const user = await db.User.findOne({
        where: { email: email }
    });
    if (!user)
        return false;
    else
        return true

}

const handleGetOneUser = async (userId) => {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user === null) {
        return {
            errorCode: 1,
            errMessage: "Not found user"
        }
    } else {
        delete user.password;
        return {
            errorCode: 0,
            errMessage: "ok",
            user
        }
    }
}

const updateUser = async (userId, data) => {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user === null)
        return {
            errorCode: 1,
            errMessage: "Not found user"
        }

    await db.User.update({ ...data }, { where: { id: userId } })
    return {
        errorCode: 0,
        errMessage: "success update user with id: " + userId,
    }
}

const removeUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        },
    });
    return {
        errorCode: 0,
        errMessage: "success remove user with id: " + userId,
    }
}

const redeemDiscount = async (userId, discountId, numberDiscount) => {
    const [user, discount] = await Promise.all([
        db.User.findOne({ where: { id: userId } }),
        db.Discount.findOne({ where: { id: discountId, expirationDate: { [Op.gte]: new Date() } } })
    ]);

    if (user === null) {
        return {
            errorCode: 1,
            errMessage: "Not found user"
        };
    }

    if (discount === null) {
        return {
            errorCode: 2,
            errMessage: "Not found discount or expire"
        };
    }
    const promise = [db.User.update({ coins: user.coins - discount.costChange * numberDiscount }, { where: { id: user.id } })]
    for (let i = 0; i < numberDiscount; i++)
        promise.push(db.UserDiscount.create({ UserId: userId, DiscountId: discountId }))
    if (user.coins >= discount.costChange * numberDiscount) {
        await Promise.all(promise);
    }
    else
        return {
            errorCode: 0,
            errMessage: "not enough coins",
        }

    return {
        errorCode: 0,
        errMessage: "success redeem Discount",
    }
}

const getAllDiscountByUser = async (userId) => {
    const discounts = await db.User.findAll({
        where: { id: userId },
        include: [{
            model: db.Discount,
            through: {
                where: {
                    'dateUsed': null
                }
            }
        }],
        nest: true,
        raw: true,
        attributes: []
    });
    if (discounts === null)
        return {
            errorCode: 1,
            errMessage: "Not found user"
        }
    const transformedDiscounts = discounts.map(discount => {
        const { UserDiscount, ...data } = discount.Discounts;
        return {
            ...data,
            userDiscountId: UserDiscount.id

        };
    });
    return {
        errorCode: 0,
        errMessage: "ok",
        discounts: transformedDiscounts
    }
}

export default {
    createUser,
    userLogin,
    handleGetOneUser,
    updateUser,
    removeUser,
    redeemDiscount,
    getAllDiscountByUser,

}