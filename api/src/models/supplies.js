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
    allowNull: false,
  },
  faceMask: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  faces: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{ timestamps: false,initialAutoIncrement: false,
freezeTableName: true,});

module.exports = Supplies;
