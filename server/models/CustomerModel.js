let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let customerSchema = new mongoose.Schema({
    customerName : {
        type: String,
        required:true,
    },
    customerEmail : {
        type:String ,
        unique : true
    },
    customerMobile_NO :{
        type:String ,
        required: true
    },
    customerPassword : {
        type:String ,
        required: true
    },
    date : {
        type: Date, 
        default:Date.now()
    }
},
{
    timestamps: true,
  }
)




//   Encrypt password before saving to DB
customerSchema.pre("save", async function (next) {
    if (!this.isModified("customerPassword")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.customerPassword, salt);
    this.customerPassword = hashedPassword;
    next();
  });


const customer = mongoose.model("customers", customerSchema);
module.exports = customer;

