'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
      User.belongsToMany(models.Address, { through: models.UserAddress })
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    coins: DataTypes.INTEGER,
    amountSpent: DataTypes.DOUBLE,
    membershipClass: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.beforeCreate(async (user, options) => {
  //   // Thực hiện các xử lý trước khi tạo
  //   const hashPassword = await bcrypt.hash(user.password, 10);
  //   user.password = hashPassword;
  // });

  return User;
};