const mongoose = require("mongoose")

const orderSchema =mongoose.Schema ({
    city:String,
    village:String,
    username: String,
    products: Number,
    amount: Number
},{timestamps: true})

const OrderModel = mongoose.model("Order",orderSchema)

module.exports = {OrderModel}