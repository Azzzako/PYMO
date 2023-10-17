const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Hospital = require("./hospital");

const Supplies = sequelize.define("Supplies", {
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    key: 'hospitalId'
  },
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
