const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Hospital = sequelize.define("Hospital", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  casePerMonth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  faceMask: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  KN95: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  faces: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Hospital.findAllHospitals = async () => {
    return await Hospital.findAll()
}

module.exports = Hospital
