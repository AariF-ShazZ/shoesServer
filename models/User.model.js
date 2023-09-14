const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: String,
    usertype: String,
    useremail: String,
    userpassword: String,
},{timestamps: true})

const UserModel = mongoose.model("User", userSchema)
module.exports = { UserModel }

