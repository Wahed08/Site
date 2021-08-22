const express = require("express");
const usersController = require("../controller/userController");
const router = express.Router();

//post routes
router.post("/signup", usersController.signup);

//get routes
router.get("/", usersController.getUsersAll);
router.get("/:uid", usersController.getUserById);
router.get("/:pid", usersController.getProfileById);


module.exports = router;
