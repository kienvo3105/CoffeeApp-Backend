import db from '../models/index'
import addressService from './addressService';
const { Sequelize, DataTypes, Op, where } = require('sequelize');

const createNewBranch = async (data) => {
    const { houseNumber, street, longitude, latitude, province, district, commune } = data.address;
    const { managerId, name, image } = data.branchInfo;

    if (!houseNumber || !street || !longitude || !latitude || !province || !district || !commune || !managerId || !name || !image)
        return { errorCode: 1, errorMessage: "lack of information!" };


    const response = await addressService.createNewAddress(data.address);
    if (response.errorCode !== 0)
        return { errorCode: 2, errorMessage: "error create new address!" };

    await db.Branch.create({ ...data.branchInfo, addressId: response.addressId });

    return { errorCode: 0, errorMessage: "ok" }

}

const getAllBranch = async () => {
    const allBranch = await db.Branch.findAll({
        include: [{
            model: db.Address,
        }, {
            model: db.Manager,
            attributes: { exclude: ['password'] },
        }],
        nest: true,
        raw: true,
        // attributes: { exclude: ['ManagerId'] },
    });
    return {
        errorCode: 0, errorMessage: "ok",
        allBranch
    }
}

const searchBranch = async (keyword) => {
    const branches = await db.Branch.findAll({
        where: {
            name: Sequelize.where(
                Sequelize.fn("lower", Sequelize.col("name")),
                "like",
                "%" + keyword + "%"
            ),
        },
        include: [{
            model: db.Address,
        }, {
            model: db.Manager,
            attributes: { exclude: ['password'] },
        }],
        nest: true,
        raw: true,
    });

    return { errorCode: 0, messageSuccess: "OK", branches }
}

const getBranchById = async (branchId) => {
    const branch = await db.Branch.findByPk(branchId, {
        include: [{
            model: db.Address,
        }, {
            model: db.Manager,
            attributes: { exclude: ['password'] },
        }],
        nest: true,
        raw: true,
    })

    if (!branch)
        return { errorCode: 1, messageSuccess: "branch not found" }

    return { errorCode: 0, messageSuccess: "OK", branch }
}

export default {
    createNewBranch,
    getAllBranch,
    searchBranch,
    getBranchById
}