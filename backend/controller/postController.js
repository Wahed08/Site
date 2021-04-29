const Post = require("../model/postModel");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const fs = require('fs');

//getPostById
const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a post.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      "Could not find a post for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ postdetails: post });
};

//getAllPost
const AllPost = async (req, res, next) => {
  let All;
  try {
    All = await Post.find();
  } catch (err) {
    const error = new HttpError(
      "Could not find any post, try again later",
      420
    );
    return next(error);
  }

  if (!All) {
    const error = new HttpError(
      "You do not have any post, create new one",
      402
    );
    return next(error);
  }

  res.status(200).json({ All_post: All.map((user) => user.toObject({ getters: true }))});
};

//createPost
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, details, category, author } = req.body;

  const createdPost = new Post({
    title,
    details,
    category,
    author,
    image: req.file.path
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError(
      "Post Uploaded failed, please try again later",
      501
    );
    return next(error);
  }

  res.status(201).json({ Post: createdPost });
};

//update post
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, details } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  post.title = title;
  post.details = details;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ updatePost: post});
};

//delete Post
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findByIdAndDelete(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete post.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }
  const Path = post.image;

  fs.unlink(Path, err => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted Post." });
};

module.exports = {
  getPostById,
  createPost,
  updatePost,
  AllPost,
  deletePost,
};
