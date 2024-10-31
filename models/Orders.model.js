const mongoose = require("mongoose")

const orderSchema =mongoose.Schema ({
    userID:String,
    username: String,
    totalProducts: Number,
    amount: Number,
    isPayment:{
        default:false
    }
},{timestamps: true})

const OrderModel = mongoose.model("Order",orderSchema)

module.exports = {OrderModel}