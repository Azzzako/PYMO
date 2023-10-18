const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Hospital = require("./hospital");

const Stock = sequelize.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    KN95: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
    faceMask: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
    faces: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
  },
  { timestamps: true }
);




module.exports = Stock;
