const { body, validationResult } = require("express-validator");
const { addUserToClub } = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateJoinClub = [
  body("secretCode").trim()
    .isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
];

const joinClub = [
  validateJoinClub,
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("join-club", {
        errors: errors.array(),
        data: req.body
      });
    }

    const { secretCode } = req.body;

    const isValidSecretCOde = secretCode === process.env.SECRET;

    if (!isValidSecretCOde) {
      return res.status(400).render("join-club", {
        errors: [{ msg: "Invalid secret code." }],
        data: req.body
      });
    }

    await addUserToClub([req.user.id]);

    res.status(200).redirect("/");
  })
] 


module.exports = {
  joinClub
}