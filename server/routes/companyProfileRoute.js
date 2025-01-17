const express = require("express");
const router = express.Router();
const {companyProfile, getCompanyData, deleteCompanyData, editCompanyData} = require("../controllers/companyProfileController");

const { upload } = require("../utils/fileUploads");
// const protect = require("../middleWares/authMiddleware");


router.post("/companyprofile", upload.single("companyLogo"), companyProfile);
router.get("/getcompanydata", getCompanyData);
router.put("/editcompanydata/:id", upload.single("companyLogo"), editCompanyData);
router.get("/deletecompanydata/:id", deleteCompanyData);



module.exports = router;