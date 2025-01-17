let mongoose = require("mongoose")

let productschema = mongoose.Schema({
    productName : {
        type : String,
        require: [true, "Please add a Product Name"]
    },
    productCategory : {
        type : String,
        require: [true, "Please add a Product Category"]
    },
    productPrice : {
        type : String,
        require: [true, "Please add a Product Price"]
    },
    productWeight : {
        type : String,
        require: [true, "Please add a Product Quantity"]
    },
    inStock : {
        type : String,
        require: [true, "Please provide in hand Stock"],
        default : 0
    },
    productdesc : {
        type : String,
        require: [true, "Please add a Product Description"]
    },
    noofPieces : {
        type : String,
        require: [true, "Please add a No of Pieces"]
    },
    productImg : {
        type:Array,
        require: [true, "Please add a Product Image"],
        default: "../assets/default_images/default_product_img.png" 
    },
    date: {
        type:Date,
        default:Date.now
    }

},
{
    timestamps: true,
  }
)


const productss = mongoose.model("products", productschema);
module.exports = productss;
