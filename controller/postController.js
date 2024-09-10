const query = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title").not().isEmpty().withMessage("title is required"),
  body("content")
    .isLength({ min: 15 })
    .withMessage("content should be minimum 15 char"),
  body()
    .custom((value, { req }) => {
      return req.user !== undefined;
    })
    .withMessage("please log in to post "),
];
async function getALLPosts(req, res) {
  const posts = (await query.getAllPosts()).rows;
  res.render("homePage", { posts: posts });
}
async function createPostGet(req, res) {
  res.render("new_message");
}
const createPostPost = [
  validatePost,
  async (req, res) => {
    if (!errorhandler(req, res)) return;
    const post = req.body;
    post.user = req.user;
    await query.createPost(post);
    res.redirect("/");
  },
];

function errorhandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.status(400).send(errors);
    return false;
  }
  return true;
}
module.exports = {
  getALLPosts,
  createPostGet,
  createPostPost,
};
