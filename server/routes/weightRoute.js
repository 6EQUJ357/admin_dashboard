const express = require("express");
const router = express.Router();
const {   weightForm,
    getproductWeight,
    deleteProductWeight,
    editproductWeight} = require("../controllers/weightController");




router.post("/weightform", weightForm);
router.get("/getweightdata", getproductWeight);
router.put("/editweight/:id",  editproductWeight);
router.get("/deleteweight/:id", deleteProductWeight);



module.exports = router;