const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: String,
    useremail: String,
    userpassword: String,
})

const UserModel = mongoose.model("User", userSchema)
module.exports = { UserModel }

