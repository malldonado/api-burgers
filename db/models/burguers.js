'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Burguers extends Model {

    static associate(models) {
    }
  }
  Burguers.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Burguers',
  });
  return Burguers;
};