'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAddress.init({
    userId: DataTypes.STRING,
    addressId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserAddress',
    tableName: 'user_address'
  });
  return UserAddress;
};