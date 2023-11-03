import db from '../models/index'
const { Sequelize, DataTypes, Op, where } = require('sequelize');

const getRevenueMonthByBranch = async (branchId) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const revenue = await db.Order.findAll({
        attributes: [
            [Sequelize.fn('DATE', Sequelize.col('orderDate')), 'date'], // Lấy ngày từ orderDate
            [Sequelize.fn('SUM', Sequelize.col('finalPrice')), 'revenue'] // Tổng doanh thu
        ],
        where: {
            branchId: branchId,
            // orderDate: {
            //     [Op.gte]: startDate, // Ngày bắt đầu
            //     [Op.lte]: currentDate // Ngày kết thúc
            // }
        },
        group: [Sequelize.fn('DATE', Sequelize.col('orderDate'))],
        order: [Sequelize.fn('DATE', Sequelize.col('orderDate'))]
    });

    const totalRevenue = revenue.reduce((total, value) => total + value.revenue, 0);
    return { errorCode: 0, messageSuccess: "OK", revenue, totalRevenue }
};

export default {
    getRevenueMonthByBranch,
}