const express = require("express");
const usersController = require("../controller/userController");
const router = express.Router();


router.post("/signup", usersController.signup);
router.get("/", usersController.getUsersAll);


module.exports = router;
