const express = require("express");
const router = express.Router();
const { productForm,
    getProductData,
    editProductData,
    deleteProductData} = require("../controllers/productController");

const { productUpload } = require("../utils/productUploads");
// const protect = require("../middleWares/authMiddleware");


router.post("/productform", productUpload.array("productImg"), productForm);
router.get("/getproductdata", getProductData);
router.put("/editproductdata/:id", productUpload.array("productImg"), editProductData);
router.get("/deleteproductdata/:id", deleteProductData);



module.exports = router;