const asyncHandler = require("express-async-handler");
const customer = require("../models/CustomerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");





// Register customer
const registerCustomer = asyncHandler(async (req, res) => {
    const { customerName, customerMobile_NO, customerPassword} = req.body;
   // console.log("back data",  req.body);   
  


    //all fields validation
    if (!customerName || !customerMobile_NO || !customerPassword) {
      return res.json({status : 400, message:"Please Fill the Fields..."});
      
    }


     // Validate password
    if (customerPassword.length < 6) {
      return res.json({status : 400, message:"Password must be up to 6 characters..."});
      
    }


         // Validate mobile no.
         if (customerMobile_NO.length != 10) {
            return res.json({status : 400, message:"mobile no must be 10 digits..."});
            
          }

     
  
    // Check if customer mobile no already exists
    const customerExists = await customer.findOne({ customerMobile_NO });
  
    if (customerExists) {
      return res.json({status : 400, message:"account with this mobile number already registered please login !"});
    }


    // Create new customer
    const savecustomer = await customer.create({
        customerName,
        customerMobile_NO,
        customerPassword  
    });
  
  
    if (savecustomer) {
        const sanitizedcustomer = savecustomer.toObject(); // Create a copy of the object
        delete sanitizedcustomer.customerPassword; // Remove password from the copy

        return res.json({status : 200, message:"register successfull please login...", customerData : sanitizedcustomer});

    } else {
      return res.json({status : 400, message:"Invalid customer data"});
    }
  });




//login customer
const loginCustomer = asyncHandler(async (req, res) => {
  const { customerMobile_NO, customerPassword } = req.body;
 // console.log("req body", req.body);

  // Validate Request
  if (!customerMobile_NO || !customerPassword) {
    return res.json({status : 400, message:"Please Fill the Fields..."});
  }



  // Check if customer exists
  const customerExist = await customer.findOne({ customerMobile_NO });

  if (!customerExist) {
    return res.json({status : 400, message : "customer Not Found..."});
  }

  // customer exists, check if password is correct
  const passwordMatch = await bcrypt.compare(customerPassword, customerExist.customerPassword);
  //console.log("first", passwordMatch)
  if(!passwordMatch){
    return res.json({status : 400, message: 'Invalid Password Credential' });
  }
  
   

   // Generate Token
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    };

    //   Generate Token
    const token = generateToken(customerExist._id);
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
  if (customerExist && passwordMatch) {
    const sanitizedcustomer = customerExist.toObject(); // Create a copy of the object
    delete sanitizedcustomer.customerPassword; // Remove password from the copy

    res.json({status : 200, customerData : sanitizedcustomer, token : token, message:"login successfully.."});
    
  } else {
    return res.json({status : 400, message : "internal server error..."})
  }
});






// Logout customer
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



//get customerData

const getcustomerData = asyncHandler(async (req, res) => {

  try{

    const search = await customer.find().select("-customerPassword");
    
    return res.json({status : 200, customerData : search})

 }
 catch(err){
     console.log(err)
     return res.json({status : 400, message : "internal server error..."})
 }

});



  module.exports = {
    registerCustomer,
    loginCustomer,
    logout,
    getcustomerData
  }