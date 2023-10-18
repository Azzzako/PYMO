const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Hospital = require("./hospital");

const Petition = sequelize.define(
  "petition",
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
    filled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    recieved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Petition;
