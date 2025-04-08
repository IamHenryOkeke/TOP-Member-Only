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

async function updateUserToAdmin(values) {
  try {
    const query = `
      UPDATE users
      SET membership_status = 'admin'
      WHERE id = $1;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updateing user:", error.message);
    throw new Error("Database error: Unable to update user");
  }
}

async function addNewMessage(values) {
  try {
    const query = `
      INSERT INTO messages (title, content, user_id) 
      VALUES ($1, $2, $3) RETURNING *; 
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting new message:", error.message);
    throw new Error("Database error: Unable to add message");
  }
}

async function deleteUserMessage(values) {
  try {
    const query = `
      DELETE FROM messages WHERE id = $1; 
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting new message:", error.message);
    throw new Error("Database error: Unable to delete message");
  }
}

async function getAllMessages() {
  try {
    const query = `SELECT messages.*, users.first_name AS userFirstName, users.last_name AS userLastName, users.membership_status 
                  FROM messages
                  JOIN users ON messages.user_id = users.id
                  ORDER BY created_at DESC
                  ;
                `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching new message:", error.message);
    throw new Error("Database error: Unable to fetch message");
  }
}

module.exports = {
  addNewUser,
  getUserByEmail,
  addUserToClub,
  addNewMessage,
  deleteUserMessage,
  getAllMessages,
  updateUserToAdmin
};