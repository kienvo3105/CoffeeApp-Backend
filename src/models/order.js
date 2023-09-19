'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
        },
        addressUserId: DataTypes.STRING,
        branchId: DataTypes.STRING,
        userId: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        quantity: DataTypes.INTEGER,
        discount: DataTypes.DOUBLE,
        finalPrice: DataTypes.DOUBLE,
        noted: DataTypes.STRING,
        statusId: DataTypes.STRING,
        deliveryMethod: DataTypes.STRING,
        orderDate: DataTypes.DATE,
        finishDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};