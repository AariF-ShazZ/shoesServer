const express  = require("express")
const { cartPostData, cartGetData, cartIncreaseQuantity, cartDecreaseQuantity } = require("../controllers/Cart.controller")
const cartRoutes = express.Router()

cartRoutes.post("/create",cartPostData)
cartRoutes.get("/read",cartGetData)
cartRoutes.post("/increaseQty",cartIncreaseQuantity)
cartRoutes.post("/decreaseQty",cartDecreaseQuantity)
module.exports = {cartRoutes}