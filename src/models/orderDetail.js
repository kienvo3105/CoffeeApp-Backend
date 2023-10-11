'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderDetail.belongsTo(models.Product, { foreignKey: "productId" })
            OrderDetail.belongsTo(models.Order, { foreignKey: "orderId" })
            OrderDetail.belongsTo(models.Size, { foreignKey: "sizeId" })
        }
    }
    OrderDetail.init({
        orderId: {
            type: DataTypes.STRING,
            primaryKey: true,
            // references: {
            //     model: 'Order', // Tên bảng Order
            //     key: 'id', // Tên trường khóa chính trong bảng Order
            // },
        },

        productId: {
            type: DataTypes.STRING,
            primaryKey: true,
            // references: {
            //     model: 'Product',
            //     key: 'id'
            // }
        },
        sizeId: {
            type: DataTypes.STRING,
            primaryKey: true,
            // references: {
            //     model: 'Size',
            //     key: 'id'
            // }
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        noted: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OrderDetail',
        tableName: 'order_detail',
    });
    return OrderDetail;
};