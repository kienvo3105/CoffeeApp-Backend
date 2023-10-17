'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('discount', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            code: {
                type: Sequelize.STRING
            },
            discount: {
                type: Sequelize.DOUBLE
            },
            expirationDate: {
                type: Sequelize.DATE
            },
            image: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('discount');
    }
};