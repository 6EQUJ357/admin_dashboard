const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {


  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log("token", token);

    if(!token){
        return res.json({status : 400, message:"Not authorized, please login !"});
    }

    let decodedToken=jwt.verify(token, process.env.JWT_SECRET);

    
    // Get Admin id from token 
    const admin = await Admin.findById(decodedToken.id).select("-password");

    if(!admin){
      return res.json({status : 400, message:"Admin not found !"});


    }

    req.admin = admin;
    next();
}
catch(err){
    console.log(`Error: ${err}`)
    return  res.json({status : 400, message:"Not authorized, please login !"})
}


});

module.exports = protect;
