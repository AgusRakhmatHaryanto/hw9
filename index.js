const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const port = process.env.app_port;
const route = require("./route.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nama Proyek Anda",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Sesuaikan dengan path ke rute Anda
};

app.use("/", route);
app.use(morgan("common"));

app.listen(port, function () {
  console.log(`Server berjalan di localost:${port}`);
});
