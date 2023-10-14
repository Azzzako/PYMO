const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const DBNAME = process.env.DB_NAME;
const DBUSER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

const sequelize = new Sequelize(DBNAME, DBUSER, PASS, {
  host: HOST,
  port: PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  logging: false,
  define: {
    timestamps: true,
  },
});


try { 
    sequelize.authenticate()
    console.log("DB Connected");
} catch (error) {
    console.log(error);
}

module.exports = sequelize 