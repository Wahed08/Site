const express = require("express");
const { check } = require("express-validator");
const postController = require("../controller/postController");
const auth = require('../middleware/auth');
const fileUpload = require('../middleware/fileUpload');
const router = express.Router();

router.post(
  "/create",
  auth,
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("details").isLength({ min: 12 }),
    check("author").not().isEmpty(),
    check("category").not().isEmpty()
  ],
  postController.createPost
);

router.patch(
  "/update/:pid",auth,
  [
    check("title").not().isEmpty(),
    check("details").isLength({ min: 12 }),
  ],
  postController.updatePost
);

router.get("/:pid", postController.getPostById);
router.get("/", postController.AllPost);
router.delete("/:pid", auth, postController.deletePost);

module.exports = router;
