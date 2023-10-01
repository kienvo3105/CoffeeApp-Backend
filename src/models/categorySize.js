'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategorySize extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CategorySize.init({
        categoryId: DataTypes.STRING,
        sizeId: DataTypes.STRING,
        additionalPrice: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'CategorySize',
        tableName: 'categorySize'
    });
    return CategorySize;
};