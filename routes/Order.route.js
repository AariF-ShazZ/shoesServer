const express  = require("express")
const { orderGetData, orderPostData } = require("../controllers/Order.controller")
const orderRoutes = express.Router()

orderRoutes.post("/create",orderPostData)
orderRoutes.get("/read",orderGetData)

module.exports = {orderRoutes}