const asyncHandler = require("express-async-handler");
const productCategoryy = require("../models/categoryModel")





//  company profile form

const categotyForm = asyncHandler(async (req, res) => {
    const { productCategory} = req.body;
   //console.log("back data",  productCategory);
   
  


    //all fields validation
    if (!productCategory) {
      return res.json({status : 400, message:"Please add Categoty..."});
      
    }

  
    // Check if company email already exists
    const productCategoryExists = await productCategoryy.findOne({ productCategory });
  
    if (productCategoryExists) {
      return res.json({status : 400, message:"product Category with this name has already setted..."});
    }


    // Create new product category
    const saveProductCategory = await productCategoryy.create({
        productCategory
    });
  
  
    if (saveProductCategory) {

        return res.json({status : 200, message:"Product Category added successfull...", productCategory : saveProductCategory});

    } else {
      return res.json({status : 400, message:"Invalid Product Category data"});
    }
  });



//get company data
  const getProductCategory = asyncHandler(async (req, res) => {

    try{

      const search = await productCategoryy.find()
      
      return res.json({status : 200, productCategory : search})

   }
   catch(err){
       console.log(err)
       return res.json({status : 400, message : "internal server error..."})
   }

  });



//  edit profile form

const editProductCategory = asyncHandler(async (req, res) => {
  const { editproductCategory} = req.body;
  const productCategoryId = req.params.id;
 // console.log("back data",  req.body);


      const productCategoryExists = await productCategoryy.findById(productCategoryId);

      // if companyData doesnt exist
      if (!productCategoryExists) {
        return res.json({status : 400, message : " Product Category not found"});
      }

       


         // update product Category data
          const updateProductCategory = await  productCategoryy.findByIdAndUpdate(
            productCategoryId, 
            {
                productCategory : editproductCategory
        },  
        {
          new: true,
          runValidators: true,
        });


        if (updateProductCategory) {

            return res.json({status : 200, message:"Product Category updated successfull..."});

        } else {
          return res.json({status : 400, message:"Invalid Product Category data"});
        }

});




  //delete company data
  const deleteProductCategoty = asyncHandler(async (req, res) => {
    console.log("delete", req.params.id);

    const search = await productCategoryy.findById(req.params.id);
    // if product doesnt exist
    if (!search) {
      return res.json({status : 400, message : "product Category not found"});
    }

    await productCategoryy.findByIdAndDelete(req.params.id);
    return res.json({status : 200, productCategory : await productCategoryy.find()});


  });


  

module.exports = {
    categotyForm,
    getProductCategory,
    deleteProductCategoty,
    editProductCategory
}