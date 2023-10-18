const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/autentication.controller");

authRouter.post("/api/auth/register", authController.register);
authRouter.get("/api/auth/login", authController.login);



module.exports = authRouter;
