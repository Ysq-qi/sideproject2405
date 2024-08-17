const express = require("express");
const { createUser, verifyToken } = require("../controllers/userController");

const router = express.Router();

router.post("/createUser", verifyToken, createUser);

module.exports = router;