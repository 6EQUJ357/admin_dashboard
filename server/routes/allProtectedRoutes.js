const express = require("express");
const router = express.Router();
const {allProtectedController} = require("../controllers/allProtectedController");
const protect = require("../middleWares/authMiddleware");



router.get(["/all"], protect, allProtectedController);

module.exports = router;