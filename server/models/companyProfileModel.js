let mongoose = require("mongoose");

let companyProfileSchema = mongoose.Schema({
    companyName : {
        type : String,
        require : [true, "Please add company name"]
    },
    companyMobile_No : {
        type: String,
        required: [true, "Please add mobile no."],
        minLength: [10, "mobile number must be 10 digits"],
        maxLength: [10, "mobile number must be 10 digits"],
    }, 
    companyEmail: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email"
        ]
    },  
    companyAddress : {
    type : String,
    required: [true, "Please add a address"],
    },
    companyLogo : {
        type: String,
        required: [true, "Please add a photo"],
        default: "../assets/default_images/demo_admin_img.jpg"
    },
    date : {
        type : Date,
        default : Date.now
    }

},
{
    timestamps: true,
  }
)


const companyProfile = mongoose.model("companyProfile", companyProfileSchema);
module.exports = companyProfile;
