const express = require("express");
const router = express.Router();

const { 
        registerAdmin, 
        loginAdmin,
        logout,
        getAdminData
} = require("../controllers/adminController");
const { upload } = require("../utils/fileUploads");

 

router.post("/register", upload.single("adminImg"), registerAdmin);
router.post("/login", loginAdmin);
router.get("/logout",  logout);
router.get("/getAdmindata",  getAdminData);



module.exports = router;