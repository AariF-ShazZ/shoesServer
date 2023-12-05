const express  = require("express")
const { cartPostData, cartGetData, cartIncreaseQuantity, cartDecreaseQuantity, cartDeleteData, createPayment } = require("../controllers/Cart.controller")
const cartRoutes = express.Router()

cartRoutes.post("/create",cartPostData)
cartRoutes.get("/read",cartGetData)
cartRoutes.delete("/delete/:id",cartDeleteData)
cartRoutes.post("/increaseQty",cartIncreaseQuantity)
cartRoutes.post("/decreaseQty",cartDecreaseQuantity)
// cartRoutes.post("/create-checkout-session",createPayment)
module.exports = {cartRoutes}