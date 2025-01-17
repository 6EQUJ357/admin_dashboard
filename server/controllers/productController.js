const asyncHandler = require("express-async-handler");
const productss = require("../models/productModel");




// product form
const productForm = asyncHandler(async (req, res) => {
    const { productName, productCategory, productPrice, productWeight, inStock, productdesc, noofPieces} = req.body;

    const images = req.files.map(data=>data.filename);
       // console.log("back data",  req);
   
  


    //all fields validation
    if (!productName || !productCategory || !productPrice || !productWeight || !inStock || !productdesc ||!noofPieces) {
      return res.json({status : 400, message:"Please Fill the Fields..."});
      
    }

  
    // Check if Admin email already exists
    const productExists = await productss.findOne({ 
      productName: { $regex: new RegExp(productName, 'i') },  
      productWeight 
    });  
    if (productExists) {
      return res.json({status : 400, message:"product already been exist"});
    }


    // Create new Admin
    const saveProduct = await productss.create({
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

      const search = await productss.find()
      
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
 

      const productDataExit = await productss.findById(productId);
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
          const updateProductData = await  productss.findByIdAndUpdate(
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

    const search = await productss.findById(req.params.id);
    // if product doesnt exist
    if (!search) {
      return res.json({status : 400, message : "product details not found"});
    }
    

    await productss.findByIdAndDelete(req.params.id);
    return res.json({status : 200, message : "product deleted successfully", productData : await productss.find()});


  });


  

module.exports = {
    productForm,
    getProductData,
    editProductData,
    deleteProductData
}