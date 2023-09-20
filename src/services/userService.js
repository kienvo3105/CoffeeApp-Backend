import db from '../models/index'
const bcrypt = require("bcrypt");

const createUser = async (data) => {
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
    if (!checkEmail)
        return { errorCode: 2, message: "email is existed" }

    return `${email} register successfully`;
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
            raw: true
        });
        if (user) {
            // check password
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                delete user.password;
                return {
                    errorCode: 0,
                    errMessage: "ok",
                    user: user
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


export default {
    createUser,
    userLogin
}