'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_address', {
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            addressId: {
                type: Sequelize.STRING,
                references: {
                    model: 'Address',
                    key: 'id',
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_address');
    }
};