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
        // categoryId: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Category', // 'Movies' would also work
        //         key: 'id'
        //     }
        // },
        // sizeId: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Size', // 'Movies' would also work
        //         key: 'id'
        //     }
        // },
        additionalPrice: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'CategorySize',
        tableName: 'category_size'
    });
    return CategorySize;
};