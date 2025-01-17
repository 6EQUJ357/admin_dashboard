const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Please add a name"]
      },
      adminEmail: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email"
        ]
      },
      adminPassword: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"]
        //   maxLength: [23, "Password must not be more than 23 characters"],
      },
      adminImg: {
        type: String,
        required: [true, "Please add a photo"],
        default: "../assets/default_images/demo_admin_img.jpg"
      },
      adminType: {
        type: String,
        default: "Admin"
      },
      date : {
        type : Date,
        default : Date.now
    }
},
{
    timestamps: true,
  }
);


//   Encrypt password before saving to DB
adminSchema.pre("save", async function (next) {
    if (!this.isModified("adminPassword")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.adminPassword, salt);
    this.adminPassword = hashedPassword;
    next();
  });
  
  const Admin = mongoose.model("Admin", adminSchema);
  module.exports = Admin;
  