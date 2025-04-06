// routes/authorRouter.js
const { Router } = require("express");
const { joinClub } = require("../controllers/joinClubController");

const joinClubRouter = Router();

joinClubRouter.get("/", (req, res) =>  res.render("join-club"));
joinClubRouter.post("/", joinClub);

module.exports = joinClubRouter;