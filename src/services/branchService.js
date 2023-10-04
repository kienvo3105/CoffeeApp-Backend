import { where } from 'sequelize';
import db from '../models/index'
import addressService from './addressService';

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
    const data = await db.Branch.findAll({
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
        data
    }
}

export default {
    createNewBranch,
    getAllBranch
}