let mongoose = require("mongoose");
let pc = require("picocolors");





let connectDB = async(req,res)=>{
    try{
        //mongoDb connection

        mongoose.connect(process.env.MONGODB_URL_STRING).then(()=>console.log(pc.magenta(`Connection to database establised ${pc.yellow("successfully...")}`))).catch(err=>console.error(`Error connection to database : ${err}`))

        // Set up a disconnected event listener
        mongoose.connection.on('disconnected', () => {
            console.warn(pc.red(`Mongoose connection to MongoDB ${pc.bgRedBright("disconnected...")}`)); 
        });

    }catch(err){
        console.log("Internal while connection to database", err);
    }
}

module.exports = connectDB;