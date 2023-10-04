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
        }
    }
    OrderDetail.init({
        orderId: {
            type: DataTypes.STRING,
            references: {
                model: 'Order',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.STRING,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        sizeId: {
            type: DataTypes.STRING,
            references: {
                model: 'Size',
                key: 'id'
            }
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        noted: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OrderDetail',
        tableName: 'order_detail'
    });
    return OrderDetail;
};