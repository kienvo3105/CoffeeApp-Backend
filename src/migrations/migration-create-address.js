'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('address', {
            id: {
                allowNull: false,
                // autoIncrement: true,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            houseNumber: {
                type: Sequelize.STRING
            },
            street: {
                type: Sequelize.STRING
            },
            commune: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            latitude: {
                type: Sequelize.DOUBLE
            },
            longitude: {
                type: Sequelize.DOUBLE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('address');
    }
};