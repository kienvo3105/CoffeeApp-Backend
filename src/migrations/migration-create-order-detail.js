'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_detail', {
            orderId: {
                type: Sequelize.STRING,
                // references: {
                //     model: 'Order',
                //     key: 'id',
                // },
            },
            productId: {
                type: Sequelize.STRING,
                // references: {
                //     model: 'Product',
                //     key: 'id',
                // },
            },
            sizeId: {
                type: Sequelize.STRING,
                // references: {
                //     model: 'Size',
                //     key: 'id',
                // },
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