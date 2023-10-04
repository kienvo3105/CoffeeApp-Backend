'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('manager', 'phoneNumber', {
      type: Sequelize.STRING // Kiểu dữ liệu mới
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('manager', 'phoneNumber', {
      type: Sequelize.INTEGER // Kiểu dữ liệu mới
    });
  }
};
