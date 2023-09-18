'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            addressUserId: {
                type: Sequelize.STRING
            },
            branchId: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            discount: {
                type: Sequelize.DOUBLE
            },
            finalPrice: {
                type: Sequelize.DOUBLE
            },
            noted: {
                type: Sequelize.STRING
            },
            statusId: {
                type: Sequelize.STRING
            },
            deliveryMethod: {
                type: Sequelize.STRING
            },
            orderDate: {
                type: Sequelize.DATE
            },
            finishDate: {
                type: Sequelize.DATE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('order');
    }
};