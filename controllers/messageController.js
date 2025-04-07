const { body, validationResult } = require("express-validator");
const { addNewMessage, deleteUserMessage } = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateNewMessage = [
  body("title").trim()
    .isLength({ min: 3 }).withMessage("Title is required and must be at least 3 characters long"),
  body("message").trim()
    .isLength({ min: 3 }).withMessage("Message is required and must be at least 3 characters long"),
];

const addMessage = [
  validateNewMessage,
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("post-message", {
        errors: errors.array(),
        data: req.body
      });
    }

    const { title, message } = req.body;

    await addNewMessage([title, message, req.user.id]);

    res.status(200).redirect("/");
  })
] 


const deleteMessage = asyncHandler(async(req, res) => {
  const { id } = req.params;
  await deleteUserMessage([id]);
  res.status(200).redirect("/");
})

module.exports = {
  addMessage,
  deleteMessage
}