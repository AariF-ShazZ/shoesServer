const mongoose = require("mongoose")

const orderSchema =mongoose.Schema ({
    userID:String,
    username: String,
    city:String,
    state:String,
    totalProducts: Number,
    amount: Number
},{timestamps: true})

const OrderModel = mongoose.model("Order",orderSchema)

module.exports = {OrderModel}