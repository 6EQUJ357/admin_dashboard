let mongoose = require("mongoose");

let QuotationSchema = mongoose.Schema({
    quotationNo : {
        type : String,
        require : true
    },
    dateOfPurchase : {
        type : String,
        require : true
    },
    paymentStatus : {
        type : String,
        require : true
    },
    customerName : {
        type : String,
        require : true
    },
    customerEmail : {
        type : String,
        unique : true
    },
    customerMobile_NO :{
        type : String,
        require : true
    },
    customerAddress : {
        type : String,
        require : true
    },
    paymentMethod : {
        type : String,
        require : true
    }, 
    cardHolderName :  {
        type : String,
        require : true
    }, 
    cardNumber : {
        type : String,
        require : true
    },
    subtotal : {
        type : String,
        require : true
    }, 
    // SGST : {
    //     type : String,
    //     require : true
    // }, 
    // CGST : {
    //     type : String,
    //     require : true
    // }, 
    totalAmount : {
        type : String,
        require : true
    }, 
    producttype : {
        type : String,
        require : true
    },
    rows : {
        type : Array,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const quotation = mongoose.model("quotations", QuotationSchema);
module.exports = quotation;

