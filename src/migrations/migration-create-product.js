'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            categoryId: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            describe: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('product');
    }
};