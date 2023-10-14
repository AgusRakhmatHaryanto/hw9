const express = require("express");
const router = express.Router();

const moviesRouter = require("./routes/movies.js");
const usersRouter = require("./routes/users.js");

router.use("/movies", moviesRouter);
router.use("/users", usersRouter);

module.exports = router;
