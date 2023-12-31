'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Size.belongsToMany(models.Category, { through: models.CategorySize })
            Size.hasMany(models.OrderDetail)
        }
    }
    Size.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Size',
        tableName: 'size'
    });
    return Size;
};