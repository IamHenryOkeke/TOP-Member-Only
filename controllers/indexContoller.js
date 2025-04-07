const { getAllMessages } = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getMessages = asyncHandler(async(req, res) => {
    const messages = await getAllMessages();
    res.render("home", { messages });
})

module.exports = {
  getMessages
}