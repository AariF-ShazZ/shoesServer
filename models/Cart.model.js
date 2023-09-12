const mongoose = require("mongoose")

const cartSchema = ({
    productID:String,
    userID:String,
    name: String,
    color: String,
    gender: String,
    original_price: Number,
    final_price: Number,
    images: [String],
    size: Number,
    reviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    qty:{
        type: Number,
        default:1,
      }
})

const CartModel = mongoose.model("Cart",cartSchema)

module.exports = {CartModel}