'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {

      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    
      Order.belongsTo(models.Table, {
        foreignKey: 'table_id',
        as: 'table'
      });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    table_id: DataTypes.INTEGER,
    total_amount: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};