'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            categoryId: {
                type: Sequelize.STRING
            },
            sizeId: {
                type: Sequelize.STRING
            },
            additionalPrice: {
                type: Sequelize.DOUBLE
            }

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};