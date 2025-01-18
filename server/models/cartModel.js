let mongoose = require("mongoose")

let cartschema = mongoose.Schema({
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
    productImg : {
        type:Array,
        require: [true, "Please add a Product Image"],
        default: "../assets/default_images/default_product_img.png" 
    },
    customerName : {
        type: String,
        required: [true, "Please add a name"]
    },
    customerMobileNO : {
        type:String ,
        required: [true, "Please add a Mobile No"],
        
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


const cartModel = mongoose.model("cart", cartschema);
module.exports = cartModel;
