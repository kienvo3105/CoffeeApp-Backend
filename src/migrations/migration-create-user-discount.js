'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_discount', {
            userId: {
                type: Sequelize.STRING
            },
            discountId: {
                type: Sequelize.STRING
            },
            dateUsed: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_discount');
    }
};