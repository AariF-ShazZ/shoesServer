const mongoose = require("mongoose")

const productsSchema = ({
    name: String,
    color: String,
    gender: String,
    original_price: Number,
    final_price: Number,
    images: [String],
    sizes: [Number],
    reviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
})

const ProductsModel = mongoose.model("Product",productsSchema)

module.exports = {ProductsModel}