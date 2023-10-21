'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notification', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                type: Sequelize.STRING
            },
            tokenId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            notifications: {
                type: Sequelize.JSON
            },
            data: {
                type: Sequelize.JSON
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('notification');
    }
};