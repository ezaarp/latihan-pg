'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key constraints to Orders table
    await queryInterface.addConstraint('Orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_orders_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Orders', {
      fields: ['table_id'],
      type: 'foreign key',
      name: 'fk_orders_table_id',
      references: {
        table: 'Tables',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key constraint to Menus table
    await queryInterface.addConstraint('Menus', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_menus_category_id',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('Orders', 'fk_orders_user_id');
    await queryInterface.removeConstraint('Orders', 'fk_orders_table_id');
    await queryInterface.removeConstraint('Menus', 'fk_menus_category_id');
  }
}; 