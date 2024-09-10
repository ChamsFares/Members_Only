const pool = require("./pool");

async function getUserById(id) {
  return (await pool.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}
async function getUserByUsername(username) {
  return (await pool.query("SELECT * FROM users WHERE email = $1", [username]))
    .rows[0];
}

async function createUser(user) {
  await pool.query(
    "INSERT INTO users (email,firstName,lastName,password) VALUES ($1,$2,$3,$4)",
    [user.email, user.firstName, user.lastName, user.password]
  );
}

async function createPost(post) {
  await pool.query("INSERT INTO posts (post,title,ownerId) VALUES ($1,$2,$3)", [
    post.content,
    post.title,
    post.user.id,
  ]);
}
async function getAllPosts() {
  const result = await pool.query(
    "select posts.title,posts.post,users.firstName,users.lastName from posts join users on users.id = posts.ownerId"
  );
  return result.rows;
}

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
  createPost,
  getAllPosts,
};
