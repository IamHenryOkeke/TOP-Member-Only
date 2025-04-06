const { pool } = require("./pool");

async function addNewUser(values) {
  try {
    const query = `
      INSERT INTO users (first_name, last_name, email, password) 
      VALUES ($1, $2, $3, $4) RETURNING *; 
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting new user:", error.message);
    throw new Error("Database error: Unable to add user");
  }
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function addUserToClub(values) {
  try {
    const query = `
      UPDATE users
      SET membership_status = 'premium'
      WHERE id = $1;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting new user:", error.message);
    throw new Error("Database error: Unable to add user");
  }
}

module.exports = {
  addNewUser,
  getUserByEmail,
  addUserToClub
};