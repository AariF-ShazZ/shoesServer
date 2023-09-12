const express  = require("express")
const { register, login, getUsers, deleteUser } = require("../controllers/User.controller")
const userRoutes =express.Router()

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get("/get",getUsers)
userRoutes.delete("/delete/:id",deleteUser)

module.exports = {userRoutes}