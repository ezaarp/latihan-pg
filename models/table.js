'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {

    static associate(models) {

      Table.hasMany(models.Order, {
        foreignKey: 'table_id',
        as: 'orders'
      });
    }
  }
  Table.init({
    table_number: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    is_available: DataTypes.BOOLEAN,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table;
};