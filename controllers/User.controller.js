const jwt  = require("jsonwebtoken")
const {UserModal} =require("../models/User.model")
const bcrypt = require("bcrypt")
require("dotenv").config()

const register = async  (req,res) => {
    const {name,email,password} = req.body
    try{
        bcrypt.hash(password,5, async (err,hash) => {
            if(err){
                res.status(401).json({
                    status: "error",
                    message: "Something went wrong",
                  });
            }else {
                const user = new UserModal({name,email,password:hash})
                await user.save()
                res.status(200).json({
                    status: "success",
                    data: user,
                    message: "Register successful!"
                  });
            }
        })
    }catch(err) {
        res.send({ "err": "Registration Failed" })
        res.status(500).json({
            status: "error",
            message: "Error occurred while Adding data to the Database",
          });
    }
}

const login = async  (req,res) => {
    const {email,password} = req.body
    try{
        const userData = await UserModal.findOne({email})
        // console.log("user => sjdflsdf",userData);
        if(userData){
            bcrypt.compare(password,userData.password, async (err,result) => {
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