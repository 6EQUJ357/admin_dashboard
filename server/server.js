const express = require("express");
const dotenv = require("dotenv").config();
const pc = require("picocolors");
const cors = require("cors");
// const errorHandler = require("./middleWares/errorMiddleware");
const path = require("path");
const multer = require("multer");



//all protect Routes
const allProtectRouter = require("./routes/allProtectedRoutes");



//Routes
const adminRouter = require("./routes/adminRoute");
const customerRouter = require("./routes/customerRoute");
const companyRouter = require("./routes/companyProfileRoute");
const categoryRouter = require("./routes/categoryRoute");
const weightRouter = require("./routes/weightRoute");
const productRouter = require("./routes/productRoute");








//express initialization
let app = express();


// Connect to DB and start server
const PORT = process.env.PORT || 9000;



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({origin : "*"})) 
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);  


//multer Admin images
app.use("/assets/upload_images", express.static(path.join(__dirname, "assets/upload_images")));
app.use("/assets/product_upload_images", express.static(path.join(__dirname, "assets/product_upload_images"))); 


//DB config 
const connectDB = require("./DB_connection/DB_config");

connectDB(); 



//initial route
app.get("/", (req,res)=>{ 
    res.send("<h1> hi... this is in one Application </h1>");
})


 
//all protect Routes
app.use("/api/protect", allProtectRouter);




// Routes Middleware 
app.use("/api/admin", adminRouter);
app.use("/api/customer", customerRouter);
app.use("/api/company", companyRouter);
app.use("/api/category", categoryRouter);
app.use("/api/weight", weightRouter);
app.use("/api/product", productRouter);





// Error Middleware 
// app.use(errorHandler);


app.listen(PORT, ()=> console.log(pc.black(pc.bgWhite(pc.bold(`server is running on port : ${pc.italic(PORT)}`)))))

