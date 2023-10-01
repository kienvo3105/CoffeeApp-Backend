import db from '../models/index'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createManager = async (data) => {
    const { email, phoneNumber, password, firstName, lastName } = data
    if (!email || !password || !phoneNumber)
        return { errorCode: 1, message: "email, password, phoneNumber are required!" };

    const hashPassword = await bcrypt.hash(password, 10);
    const [manager, checkEmail] = await db.Manager.findOrCreate({
        where: { email: email },
        defaults: {
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        }
    });
    if (!checkEmail)
        return { errorCode: 2, message: "email is existed" }

    return { errorCode: 0, message: `manager with ${email} register successfully` }
};

const managerLogin = async (email, password) => {
    if (!email || !password) {
        return {
            errorCode: 1,
            errMessage: "Email and password are required"
        };
    }

    const isExist = await checkEmail(email);
    if (isExist) {
        //manager exist
        const manager = await db.Manager.findOne({
            where: { email: email },
            // raw: true
        });
        if (manager) {
            // check password
            const checkPassword = await bcrypt.compare(password, manager.password);
            if (checkPassword) {
                const accessToken = jwt.sign(
                    {
                        Info: {
                            id: manager.id,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: 60000 * 5 }
                );
                // delete manager.password;
                return {
                    errorCode: 0,
                    errMessage: "ok",
                    token: accessToken,
                    // manager: manager
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
    const manager = await db.Manager.findOne({
        where: { email: email }
    });
    if (!manager)
        return false;
    else
        return true

}

const handleGetOneManager = async (managerId) => {
    const manager = await db.Manager.findOne({ where: { id: managerId } });
    if (manager === null) {
        return {
            errorCode: 1,
            errMessage: "Not found manager"
        }
    } else {
        delete manager.password;
        return {
            errorCode: 0,
            errMessage: "ok",
            manager
        }
    }
}

const handleGetAllManager = async () => {
    const managers = await db.Manager.findAll({
        attributes: ["id", "email", "phoneNumber", "firstName", "lastName"]
    })
    if (managers === null)
        return {
            errorCode: 1,
            errMessage: "manager table empty!"
        }

    return {
        errorCode: 0,
        errMessage: "ok",
        managers
    }
}


export default {
    createManager,
    managerLogin,
    handleGetOneManager,
    handleGetAllManager
}