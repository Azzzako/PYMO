const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Supplies = require("./supplies");
const Petition = require("./petitions");

const Hospital = sequelize.define(
  "Hospital",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    casePerMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    streetNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: true, freezeTableName: true }
);

Hospital.hasOne(Supplies, { foreignKey: "hospitalId" });
Hospital.hasMany(Petition);
module.exports = Hospital;
