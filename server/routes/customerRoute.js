const express = require("express");
const router = express.Router();

const { 
    registerCustomer,
    loginCustomer,
    logout,
    getcustomerData
} = require("../controllers/customerController");



router.post("/registercustomer", registerCustomer);
router.post("/logincustomer", loginCustomer);
router.get("/logout",  logout);
router.get("/getcustomerdata",  getcustomerData);



module.exports = router;