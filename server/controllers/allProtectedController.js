const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");



// all protected routes
const allProtectedController = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
  
    if (admin) { 
      const sanitizedAdmin = admin.toObject(); // Create a copy of the object
      delete sanitizedAdmin.adminPassword; // Remove password from the copy
  
      return res.json({status : 200, Admin: sanitizedAdmin});

     
    } else {
      return res.json({status : 400, message: 'Admin Not Found !' });

    }
  });


  
  module.exports = {
    allProtectedController
  }