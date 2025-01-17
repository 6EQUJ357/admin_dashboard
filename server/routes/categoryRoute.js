const express = require("express");
const router = express.Router();
const { categotyForm,
    getProductCategory,
    editProductCategory,
    deleteProductCategoty} = require("../controllers/categotyController");




router.post("/categoryform", categotyForm);
router.get("/getcategorydata", getProductCategory);
router.put("/editcategory/:id",  editProductCategory);
router.get("/deletecategory/:id", deleteProductCategoty);



module.exports = router;