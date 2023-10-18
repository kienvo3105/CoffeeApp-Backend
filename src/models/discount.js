'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Discount.belongsToMany(models.User, { through: models.UserDiscount })
        }
    }
    Discount.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
        },
        code: DataTypes.STRING,
        discount: DataTypes.DOUBLE,
        expirationDate: DataTypes.DATE,
        releaseDate: DataTypes.DATE,
        image: DataTypes.STRING,
        costChange: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Discount',
        tableName: 'discount'
    });
    return Discount;
};