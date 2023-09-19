import db from '../models/index'
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (data) => {
    const { email, password, phoneNumber, lastName, firstName } = data;
    if (!email || !password || !phoneNumber || !lastName || !firstName)
        return { errorCode: 1, message: "email, password, phoneNumber,name are required!" };

    const hashPassword = await bcrypt.hash(password, 10);
    const [user, checkEmail] = await db.User.findOrCreate({
        where: { email: email },
        defaults: {
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            coins: 0,
            amountSpent: 0,
            membershipClass: "Bạc"
        }
    });

    // const checkEmail = await db.User.findOne({ where: { email: email } });
    if (!checkEmail)
        return { errorCode: 2, message: "email is existed" }

    // const user = await db.User.create({
    //     email: email,
    //     password: hashPassword,
    //     firstName: firstName,
    //     lastName: lastName,
    //     phoneNumber: phoneNumber,
    //     coins: 0,
    //     amountSpent: 0,
    //     membershipClass: "Bạc"
    // });
    return `${email} register successfully`;
});


export default {
    createUser
}