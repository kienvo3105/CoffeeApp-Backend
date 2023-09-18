'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_detail', {
            orderId: {
                type: Sequelize.STRING
            },
            productId: {
                type: Sequelize.STRING
            },
            sizeId: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DOUBLE
            },
            noted: {
                type: Sequelize.STRING
            }

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('order_detail');
    }
};