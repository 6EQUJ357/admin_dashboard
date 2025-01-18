const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");




// cart form
const cartForm = asyncHandler(async (req, res) => {
    const { productName, productCategory, productPrice, productWeight, productImg, customerName, customerMobileNO} = req.body;


    //all fields validation
    if (!productName || !productCategory || !productPrice || !productWeight || !productImg ) {
      return res.json({status : 400, message:"Please provide the Fields..."});
      
    }

  






    
    // Check if Admin email already exists
    const productExists = await cartModel.findOne({ 
      productName: { $regex: new RegExp(productName, 'i') },  
      productWeight 
    });  
    if (productExists) {
      return res.json({status : 400, message:"product already been exist"});
    }


    // Create new Admin
    const saveProduct = await cartModel.create({
        productName, productCategory, productPrice, productWeight, inStock, productdesc, noofPieces, productImg : images
    });
  

  
    if (saveProduct) {

        return res.json({status : 200, message:"product added successfull...", productData : saveProduct});

    } else {
      return res.json({status : 400, message:"Invalid product data"});
    }
  });





//get product data
const getProductData = asyncHandler(async (req, res) => {

    try{

      const search = await cartModel.find()
      
      return res.json({status : 200, productData : search})

   }
   catch(err){
       console.log(err)
       return res.json({status : 400, message : "internal server error..."})
   }

  });



//  edit profile form

const editProductData = asyncHandler(async (req, res) => {
  const {productName, productCategory, productPrice, productWeight, inStock, productdesc, noofPieces} = req.body;
  const productId = req.params.id;
 //console.log("back data",  req);
 

      const productDataExit = await cartModel.findById(productId);
     // console.log("productDataExit", productDataExit);

      // if productData doesnt exist
      if (!productDataExit) {
        return res.json({status : 400, message : "product data not found"});
      }
 
        let images;
         if(req.files == '' || null){ 
             images = productDataExit.productImg
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/productprofileimg/' + req.file.filename;
        images = req.files.map(data=>data.filename);
         }
 

         // update product data
          const updateProductData = await  cartModel.findByIdAndUpdate(
            productId, 
            {
                productName, productCategory, productPrice, productWeight, inStock, productdesc, noofPieces, productImg : images
        },  
        {
          new: true,
          runValidators: true,
        });


        if (updateProductData) {

            return res.json({status : 200, message:"product details updated successfull..."});

        } else {
          return res.json({status : 400, message:"Invalid product data"});
        }

});




  //delete product data
  const deleteProductData = asyncHandler(async (req, res) => {

    const search = await cartModel.findById(req.params.id);
    // if product doesnt exist
    if (!search) {
      return res.json({status : 400, message : "product details not found"});
    }
    

    await cartModel.findByIdAndDelete(req.params.id);
    return res.json({status : 200, message : "product deleted successfully", productData : await cartModel.find()});


  });


  

module.exports = {
    cartForm,
    getProductData,
    editProductData,
    deleteProductData
}