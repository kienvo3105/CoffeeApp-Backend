import db from '../models/index'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            membershipClass: "Bạc"
        }
    });
    if (!checkEmail)
        return { errorCode: 2, message: "email is existed" }

    return { errorCode: 0, message: `${email} register successfully` }
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
                    { expiresIn: 60 * 5 }
                );
                // delete user.password;
                return {
                    errorCode: 0,
                    errMessage: "ok",
                    token: accessToken,
                    // user: user
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

export default {
    createUser,
    userLogin,
    handleGetOneUser
}