const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const Token = require("../models/tokenModel");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");



// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { adminName, adminEmail, adminPassword, adminConfirmPassword} = req.body;
   // console.log("back data",  req.body);
    const image = req.file.filename;
   
  


    //all fields validation
    if (!adminName || !adminEmail || !adminPassword || !adminConfirmPassword) {
      return res.json({status : 400, message:"Please Fill the Fields..."});
      
    }


     // Validate password
    if (adminPassword.length < 6) {
      return res.json({status : 400, message:"Password must be up to 6 characters..."});
      
    }


    //Compare password and confirm password
    if (adminPassword != adminConfirmPassword) {
      return res.json({status : 400, message:"Passwords did not match"});
      }


     // email validation regular expression
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;



     // Validate email
     if (!adminEmail || !emailRegex.test(adminEmail)) {
      return res.json({status : 400, message:"Invalid email"});
        
     }

     
  
    // Check if Admin email already exists
    const adminExists = await Admin.findOne({ adminEmail });
  
    if (adminExists) {
      return res.json({status : 400, message:"Email has already been registered"});
    }


    // Create new Admin
    const saveAdmin = await Admin.create({
        adminName,
        adminEmail,
        adminPassword,
        adminImg : image
    });
  

    // // Generate Token
    // const generateToken = (id) => {
    //     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // };

    // //   Generate Token
    // const token = generateToken(saveAdmin._id);
  
    // // Send HTTP-only cookie
    // res.cookie("token", token, {
    //   path: "/",
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //   sameSite: "none",
    //   secure: true,
    // });
  
    if (saveAdmin) {
        const sanitizedAdmin = saveAdmin.toObject(); // Create a copy of the object
        delete sanitizedAdmin.adminPassword; // Remove password from the copy

        return res.json({status : 200, message:"register successfull...", Admin : sanitizedAdmin});

    } else {
      return res.json({status : 400, message:"Invalid Admin data"});
    }
  });






//login Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
 // console.log("req body", req.body);

  // Validate Request
  if (!adminEmail || !adminPassword) {
    return res.json({status : 400, message:"Please Fill the Fields..."});
  }


   // email validation regular expression
   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

   // Validate email
   if (!adminEmail || !emailRegex.test(adminEmail)) {
       return res.json({status : 400, message: 'Invalid email' });
   }


  // Check if Admin exists
  const admin = await Admin.findOne({ adminEmail });

  if (!admin) {
    return res.json({status : 400, message : "Admin Not Found..."});
  }

  // Admin exists, check if password is correct
  const passwordMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
  //console.log("first", passwordMatch)
  if(!passwordMatch){
    return res.json({status : 400, message: 'Invalid Password Credential' });
  }
  


   // Generate Token
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    };

    //   Generate Token
    const token = generateToken(admin._id);
    if(!token) {
      console.log(err);
      return res.json({status : 400, message :"Error while generating token"})
  }

  
//   if(passwordMatch){
//    // Send HTTP-only cookie
//   res.cookie("token", token, {
//     path: "/",
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 86400), // 1 day
//     sameSite: "none",
//     secure: true,
//   });
// }
  if (admin && passwordMatch) {
    const sanitizedAdmin = admin.toObject(); // Create a copy of the object
    delete sanitizedAdmin.adminPassword; // Remove password from the copy

    res.json({status : 200, Admin : sanitizedAdmin, token : token, message:"login successfully.."});
    
  } else {
    return res.json({status : 400, message : "internal server error..."})
  }
});






// Logout Admin
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.json({status : 200, message : "Successfully Logged Out"})
});



//get AdminData

const getAdminData = asyncHandler(async (req, res) => {

  try{

    const search = await Admin.find().select("-adminPassword");
    
    return res.json({status : 200, adminData : search})

 }
 catch(err){
     console.log(err)
     return res.json({status : 400, message : "internal server error..."})
 }

});



  module.exports = {
    registerAdmin,
    loginAdmin,
    logout,
    getAdminData
  }