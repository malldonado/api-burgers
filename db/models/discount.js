"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {}
  }

  Discount.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );

  return Discount;
};
