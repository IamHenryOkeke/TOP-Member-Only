const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const path = require("node:path");
const pgSession = require('connect-pg-simple')(expressSession);

const { pool } = require('./db/pool');
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const { isAuth } = require('./middlewares/authMiddleware');
const messageRouter = require('./routes/messageRouter');
const memberRouter = require('./routes/memberRouter');


require('./config/passport');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sessionStore = new pgSession({
  pool,               
  tableName : 'session'   
});

app.use(expressSession({
  store: sessionStore,
  saveUninitialized: true,
  secret: process.env.SECRET || "my-secret-token",
  resave: false,
  name: "user-session",
  cookie: { 
    maxAge: 10 * 60 * 1000, // expires in one hours in milliseconds
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict"
  } 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) res.locals.user = req.user;
  next();
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.use("/auth", isAuth, authRouter);
app.use("/member", isAuth, memberRouter);
app.use("/message", isAuth, messageRouter);
app.use("/", indexRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});