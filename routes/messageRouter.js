// routes/authorRouter.js
const { Router } = require("express");
const { addMessage, deleteMessage } = require("../controllers/messageController");
const { isAdmin } = require("../middlewares/authMiddleware");

const messageRouter = Router();

messageRouter.get("/post", (req, res) =>  res.render("post-message"));
messageRouter.post("/post", addMessage);

messageRouter.post("/:id/delete",isAdmin, deleteMessage);

module.exports = messageRouter;