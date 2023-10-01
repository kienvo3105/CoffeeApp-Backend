import db from '../models/index'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const adminLogin = async (email, password, res) => {
    if (!email || !password) {
        return { errorCode: 1, errorMessage: "email, password are required!" };
    }
    const foundAdmin = await db.Admin.findOne({ where: { email: email } });
    if (foundAdmin === null)
        return {
            errorCode: 2,
            errorMessage: "Not found admin"
        }

    const checkPassword = await bcrypt.compare(password, foundAdmin.password);
    if (!checkPassword)
        return {
            errorCode: 3,
            errorMessage: "Wrong password"
        };

    const accessToken = jwt.sign(
        {
            Info: {
                email: foundAdmin.email,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: 60000 * 5 }
    );

    const refreshToken = jwt.sign(
        {
            AdminInfo: {
                email: foundAdmin.email,
            },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    delete foundAdmin.password;
    return {
        errorCode: 0,
        errorMessage: "ok",
        accessToken,
        foundAdmin
    };
}

const adminRefresh = async (cookies) => {
    if (!cookies?.jwt) return { errorCode: 1, errorMessage: "token expire!" };
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return { errorCode: 3, errorMessage: "Forbidden!" };

            const foundAdmin = await db.Admin.findOne({ where: { email: decoded.AdminInfo.email } });

            if (!foundAdmin) return {
                errorCode: 2,
                errorMessage: "Not found admin"
            }


            const accessToken = jwt.sign(
                {
                    AdminInfo: {
                        email: foundAdmin.email,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
            return {
                errorCode: 0,
                errorMessage: "ok",
                accessToken,
                foundAdmin
            };
        })
    );
}

export default {
    adminLogin,
    adminRefresh
}