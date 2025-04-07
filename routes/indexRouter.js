// routes/authorRouter.js
const { Router } = require("express");
const { getMessages } = require("../controllers/indexContoller");

const indexRouter = Router();

indexRouter.get("/", getMessages);

module.exports = indexRouter;