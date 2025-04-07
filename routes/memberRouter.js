// routes/authorRouter.js
const { Router } = require("express");
const { joinClub, becomeAnAdmin } = require("../controllers/memberController");
const { isMember } = require("../middlewares/authMiddleware");

const memberRouter = Router();

memberRouter.get("/join-club", (req, res) =>  res.render("join-club"));
memberRouter.post("/join-club", joinClub);

memberRouter.get("/become-an-admin", isMember, (req, res) =>  res.render("become-an-admin"));
memberRouter.post("/become-an-admin", isMember, becomeAnAdmin);

module.exports = memberRouter;