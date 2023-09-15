const mongoose = require("mongoose")

const orderSchema =mongoose.Schema ({
    city:String,
    state:String,
    username: String,
    totalProducts: Number,
    amount: Number
},{timestamps: true})

const OrderModel = mongoose.model("Order",orderSchema)

module.exports = {OrderModel}