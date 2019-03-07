const express = require("express");
const router = express.Router();

router.get("/users", userController.index);
router.post("/users/signup", userController.signup);

module.exports = router;
