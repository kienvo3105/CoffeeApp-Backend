'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Branch.belongsTo(models.Address, { foreignKey: 'addressId' });
            Branch.belongsTo(models.Manager, { foreignKey: 'managerId' });
        }
    }
    Branch.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
        },
        addressId: DataTypes.STRING,
        managerId: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Branch',
        tableName: 'branch'
    });
    return Branch;
};