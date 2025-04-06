// routes/authorRouter.js
const { Router } = require("express");
const { userSignUp } = require("../controllers/authController");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/sign-up", (req, res) =>  res.render("sign-up"));
authRouter.post("/sign-up", userSignUp);

authRouter.get("/login", (req, res) =>  res.render("login"));
authRouter.post("/login", 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = authRouter;