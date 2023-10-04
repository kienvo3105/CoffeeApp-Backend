'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('category_size', {
            categoryId: {
                type: Sequelize.STRING,
                // references: {
                //     model: 'Category',
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
            additionalPrice: {
                type: Sequelize.DOUBLE
            }

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('category_size');
    }
};