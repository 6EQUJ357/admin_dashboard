const asyncHandler = require("express-async-handler");
const productWeightt = require("../models/weightModel")





//  company profile form

const weightForm = asyncHandler(async (req, res) => {
    const { productWeight} = req.body;
   //console.log("back data",  productWeight);
   
  


    //all fields validation
    if (!productWeight) {
      return res.json({status : 400, message:"Please add product Weight..."});
      
    }

  
    // Check if company email already exists
    const productWeightExists = await productWeightt.findOne({ productWeight });
  
    if (productWeightExists) {
      return res.json({status : 400, message:"product weight with this name has already setted..."});
    }


    // Create new product Weight
    const saveproductWeight = await productWeightt.create({
      productWeight
    });
  
  
    if (saveproductWeight) {

        return res.json({status : 200, message:"Product Weight added successfull...", productWeight : saveproductWeight});

    } else {
      return res.json({status : 400, message:"Invalid Product Weight data"});
    }
  });



//get company data
  const getproductWeight = asyncHandler(async (req, res) => {

    try{

      const search = await productWeightt.find()
      
      return res.json({status : 200, productWeight : search})

   }
   catch(err){
       console.log(err)
       return res.json({status : 400, message : "internal server error..."})
   }

  });



//  edit profile form

const editproductWeight = asyncHandler(async (req, res) => {
  const { editproductWeight} = req.body;
  const productWeightId = req.params.id;
 // console.log("back data",  req.body);


      const productWeightExists = await productWeightt.findById(productWeightId);

      // if companyData doesnt exist
      if (!productWeightExists) {
        return res.json({status : 400, message : " Product Weight not found"});
      }

       


         // update product Weight data
          const updateproductWeight = await  productWeightt.findByIdAndUpdate(
            productWeightId, 
            {
                productWeight : editproductWeight
        },  
        {
          new: true,
          runValidators: true,
        });


        if (updateproductWeight) {

            return res.json({status : 200, message:"Product Weight updated successfull..."});

        } else {
          return res.json({status : 400, message:"Invalid Product Weight data"});
        }

});




  //delete company data
  const deleteProductWeight = asyncHandler(async (req, res) => {
    console.log("delete", req.params.id);

    const search = await productWeightt.findById(req.params.id);
    // if product doesnt exist
    if (!search) {
      return res.json({status : 400, message : "product Weight not found"});
    }

    await productWeightt.findByIdAndDelete(req.params.id);
    return res.json({status : 200, productWeight : await productWeightt.find()});


  });


  

module.exports = {
    weightForm,
    getproductWeight,
    deleteProductWeight,
    editproductWeight
}