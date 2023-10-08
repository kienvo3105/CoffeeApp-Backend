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
      // UserAddress.belongsToMany(models.Order,{through: 'order_useraddress',foreignKey:'id'});
      UserAddress.hasMany(models.Order);
    }
  }
  UserAddress.init({
    // userId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'User',
    //     key: 'id'
    //   }
    // },
    // addressId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'Address',
    //     key: 'id'
    //   }
    // },
  }, {
    sequelize,
    modelName: 'UserAddress',
    tableName: 'user_address'
  });
  return UserAddress;
};