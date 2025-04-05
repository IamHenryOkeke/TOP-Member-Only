const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../db/pool');
const { validPassword } = require('../utils/passwordUtils');

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const verifyCallback = async (email, password, done) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return done(null, false);
    }
    
    const isValid = await validPassword(password, user.password);
    return isValid ? done(null, user) : done(null, false);
  } catch (error) {
    console.error('Error executing query', error.stack);
    return done(error);
  }
}
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    console.error('Error executing query', error.stack);
    done(error);
  }
});