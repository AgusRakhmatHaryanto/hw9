const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.portenv;
const morgan = require("morgan");
const swaggerjsdocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRouter = require('./routes/authentication.route.js')


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Homework 9 Dokumentasi API",
      version: "1.0.0",
      description:
        "Simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8081",
      },
    ],
  },
  apis: ["./routes/movie.route.js", "./routes/user.route.js"],
};

const specs = swaggerjsdocs(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


const routeMovies = require("./routes/movie.route.js");
const routeUsers = require("./routes/user.route.js");

app.use(morgan("combined"));
app.use(express.json());
app.use(routeMovies);
app.use(routeUsers);
app.use(authRouter);


app.listen(port, () => {
  console.log(`Aplikasi berjalan di localhost:${port}`);
});
