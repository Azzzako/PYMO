const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const sequelize = require("./database");
const hospitalRoute = require("./src/routes/hospitalRoute")

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//Rutas
app.use("/hospital", hospitalRoute);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);
  });
});
