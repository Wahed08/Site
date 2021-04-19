const express = require("express");
const { check } = require("express-validator");
const postController = require("../controller/postController");
const auth = require('../middleware/auth');
const fileUpload = require('../middleware/fileUpload');
const router = express.Router();

router.post(
  "/create",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("details").isLength({ min: 12 }),
    check("author").not().isEmpty(),
    check("category").not().isEmpty()
  ],
  postController.createPost
);

router.get("/:pid", postController.getPostById);
router.get("/", postController.AllPost);
router.delete("/:pid",postController.deletePost);

module.exports = router;
