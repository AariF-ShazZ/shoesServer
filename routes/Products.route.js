const express = require("express")
const { postData, getData, updateData, deleteData, singleData, getAllData } = require("../controllers/Products.controller")
const productsRoutes = express.Router()

productsRoutes.get("/all",getAllData)
productsRoutes.post("/create",postData)
productsRoutes.get("/read",getData)
productsRoutes.patch("/update/:id",updateData)
productsRoutes.delete("/delete/:id",deleteData)
productsRoutes.get("/read/:id",singleData)

module.exports = {productsRoutes}