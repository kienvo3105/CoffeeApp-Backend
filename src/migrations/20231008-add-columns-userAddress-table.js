'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('user_address', 'userName', {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn('user_address', 'phoneNumber', {
                type: Sequelize.STRING,
            })
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('user_address', 'userName'),
            queryInterface.removeColumn('user_address', 'phoneNumber')
        ]);
    }
};
