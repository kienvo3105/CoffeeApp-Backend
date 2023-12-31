'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_address', {
            userId: {
                type: Sequelize.STRING,
            },
            addressId: {
                type: Sequelize.STRING,
            },
            userName: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            }
        });

    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_address');
    }
};