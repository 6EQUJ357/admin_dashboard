let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let customerSchema = new mongoose.Schema({
    customerName : {
        type: String,
        required: [true, "Please add a name"]
    },
    customerMobile_NO :{
        type:String ,
        unique : true,
        required: [true, "Please add a Mobile No"],
    },
    customerPassword : {
        type:String ,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"]
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

