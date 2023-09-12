const express  = require("express")
const { register, login, getUsers } = require("../controllers/User.controller")
const userRoutes =express.Router()

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get("/get",getUsers)

module.exports = {userRoutes}