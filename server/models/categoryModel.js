let mongoose = require("mongoose");

let categoryScheme = new mongoose.Schema({
    
    productCategory : {
        type : String,
        required:  [true, "Please add a Product Category"],
        unique:true
    },
    Date : {
        type :Date,
        default :  Date.now
    }
},
{
    timestamps: true,
  }
)

const productCategoryy = mongoose.model("productCategory", categoryScheme);
module.exports = productCategoryy;
