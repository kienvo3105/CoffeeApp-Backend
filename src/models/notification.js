'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Notification.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: 'Users', // Tên bảng User trong cơ sở dữ liệu
                key: 'id',
            },
        },
        tokenId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notifications: {
            type: DataTypes.JSON, // Loại dữ liệu JSON cho mảng đối tượng
        },
        data: {
            type: DataTypes.JSON, // Loại dữ liệu JSON cho đối tượng data
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Notification',
        tableName: 'notification'
    });
    return Notification;
};