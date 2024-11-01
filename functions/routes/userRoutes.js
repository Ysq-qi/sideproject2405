const express = require("express");
const { createUser, getProfile, updateProfile, changePassword, deleteUserAccount } = require("../controllers/userController");
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createUser', createUser);
router.get('/getProfile', verifyToken, getProfile);
router.put('/updateProfile', verifyToken, updateProfile);
router.put('/changePassword', verifyToken, changePassword);
router.post('/deleteUserAccount', verifyToken, deleteUserAccount);

module.exports = router;