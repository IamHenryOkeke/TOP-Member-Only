// routes/authorRouter.js
const { Router } = require("express");
const { isAuth } = require("../middlewares/authMiddleware");

const indexRouter = Router();

indexRouter.get("/", isAuth, (req, res) =>  res.render("home"));

module.exports = indexRouter;