const jwt  = require("jsonwebtoken")
const {UserModel} =require("../models/User.model")
const bcrypt = require("bcrypt")
require("dotenv").config()

const register = async  (req,res) => {
    const { username,useremail, userpassword } = req.body
    // console.log(username,useremail, password)
    try {
        bcrypt.hash(userpassword, 5, async (err, hash) => {
            if(err){
                res.status(401).json({
                    status: "error",
                    message: "Something went wrong",
                  });
            } else {
                let user = new UserModel({ username, useremail, userpassword:hash})
                await user.save()
                res.status(200).json({
                    status: "success",
                    data: user,
                    message: "Register successful!"
                  });
            }
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error occurred while Adding data to the Database",
          });
    }
}

const login = async  (req,res) => {
    const { username,useremail, userpassword } = req.body
    // console.log(username,useremail, userpassword )
    try{
        const userData = await UserModel.findOne({useremail})
        // console.log("user => sjdflsdf",userData);
        if(userData){
            bcrypt.compare(userpassword,userData.userpassword, async (err,result) => {
                if(result){
                    const token = jwt.sign({_id:userData._id},process.env.key)
                    res.status(200).json({
                        status: "success",
                        data: userData,
                        message: "Login successful!",
                        token: token,
                      });
                }else {
                    res.status(401).json({
                        status: "error",
                        message: "Invalid credentials",
                      });
                }
            })
        }else {
            res.status(401).json({
                status: "error",
                message: "User doesn't exist",
              });
        }
    }catch(err) {
        res.status(500).json({
            status: "error",
            message: "Error occurred while fetching data",
          });
    }
}
module.exports  = {register,login}