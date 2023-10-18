const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Supplies = sequelize.define("Supplies", {
  KN95: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  faceMask: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  faces: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{ timestamps: true, initialAutoIncrement: false,
freezeTableName: true,});

module.exports = Supplies;
