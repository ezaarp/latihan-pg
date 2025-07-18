'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      Menu.hasMany(models.OrderItem, {
        foreignKey: 'menu_id',
        as: 'orderItems'
      });
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    category_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    is_available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};