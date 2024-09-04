const express = require("express");
const { createUser, updateProfile, changePassword } = require("../controllers/userController");
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/createUser", createUser);
router.put('/profile', verifyToken, updateProfile);
router.post('/changePassword', verifyToken, changePassword);

module.exports = router;