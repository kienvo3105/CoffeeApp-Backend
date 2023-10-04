'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Address.hasOne(models.Branch, { foreignKey: 'addressId' })
        }
    }
    Address.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
        },
        houseNumber: DataTypes.STRING,
        street: DataTypes.STRING,
        commune: DataTypes.STRING,
        district: DataTypes.STRING,
        province: DataTypes.STRING,
        latitude: DataTypes.DOUBLE,
        longitude: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Address',
        tableName: 'address'
    });
    return Address;
};