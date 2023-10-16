const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Hospital = require("./hospital");

const Petition = sequelize.define(
  "Petition",
  {
    petitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    },
    fullFilled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Petition;
