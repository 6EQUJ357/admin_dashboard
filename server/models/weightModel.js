let mongoose = require("mongoose");

let weightScheme = new mongoose.Schema({
    
    productWeight : {
        type : String,
        required:  [true, "Please add a Product weight"],
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

const productWeightt = mongoose.model("productWeight", weightScheme);
module.exports = productWeightt;
