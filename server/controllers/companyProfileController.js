const asyncHandler = require("express-async-handler");
const companyprofile = require("../models/companyProfileModel");





//  company profile form

const companyProfile = asyncHandler(async (req, res) => {
    const { companyName, companyMobile_No, companyEmail, companyAddress} = req.body;
   // console.log("back data",  req.body);
    const image = req.file.filename;
   
  


    //all fields validation
    if (!companyName || !companyMobile_No ||!companyEmail || !companyAddress) {
      return res.json({status : 400, message:"Please Fill the Fields..."});
      
    }


     // Validate password
    if (companyMobile_No.length != 10) {
      return res.json({status : 400, message:"Password must be 10 digits ..."});
      
    }


     // email validation regular expression
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;



     // Validate email
     if (!companyEmail || !emailRegex.test(companyEmail)) {
      return res.json({status : 400, message:"Invalid email"});
        
     }


        // Validate address
        if (!companyAddress) {
            return res.json({status : 400, message:" Enter company address"});
              
           }

  
    // Check if company email already exists
    const companyExists = await companyprofile.findOne({ companyEmail });
  
    if (companyExists) {
      return res.json({status : 400, message:"Email has already setted..."});
    }


    // Create new Admin
    const saveCompanyProfile = await companyprofile.create({
        companyName, 
        companyMobile_No, 
        companyEmail, 
        companyAddress,
        companyLogo : image
    });
  
  
    if (saveCompanyProfile) {

        return res.json({status : 200, message:"company register successfull...", companyProfile : saveCompanyProfile});

    } else {
      return res.json({status : 400, message:"Invalid company data"});
    }
  });



//get company data
  const getCompanyData = asyncHandler(async (req, res) => {

    try{

      const search = await companyprofile.find()
      
      return res.json({status : 200, companyData : search})

   }
   catch(err){
       console.log(err)
       return res.json({status : 400, message : "internal server error..."})
   }

  });



//  edit profile form

const editCompanyData = asyncHandler(async (req, res) => {
  const { companyName, companyMobile_No, companyEmail, companyAddress} = req.body;
  const companyId = req.params.id;
 // console.log("back data",  req.body);


      const companyData = await companyprofile.findById(companyId);

      // if companyData doesnt exist
      if (!companyData) {
        return res.json({status : 400, message : "company Profile not found"});
      }

        let images;
         if(req.file === '' || null){ 
             images = companyData?.companyLogo
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/companyprofileimg/' + req.file.filename;
        images = req.file.filename
         }


         // update company data
          const updateCompanyData = await  companyprofile.findByIdAndUpdate(
            companyId, 
            {
            companyName, 
            companyMobile_No, 
            companyEmail, 
            companyAddress,
            companyLogo : images
        },  
        {
          new: true,
          runValidators: true,
        });


        if (updateCompanyData) {

            return res.json({status : 200, message:"company details updated successfull..."});

        } else {
          return res.json({status : 400, message:"Invalid company data"});
        }

});




  //delete company data
  const deleteCompanyData = asyncHandler(async (req, res) => {

    const search = await companyprofile.findById(req.params.id);
    // if product doesnt exist
    if (!search) {
      return res.json({status : 400, message : "company Profile not found"});
    }

    await companyprofile.findByIdAndDelete(req.params.id);
    return res.json({status : 200, message : "company profile deleted successfully", companyData : await companyprofile.find()});


  });


  

module.exports = {
    companyProfile,
    getCompanyData,
    deleteCompanyData,
    editCompanyData
}