const jwt  = require("jsonwebtoken")
const {UserModal} =require("../models/User.model")
const bcrypt = require("bcrypt")
require("dotenv").config()
const register = async  (req,res) => {
    const {name,email,password} = req.body
    try{
        bcrypt.hash(password,5, async (err,hash) => {
            if(err){
                res.send({"err": "Something went wrong" })
            }else {
                const user = new UserModal({name,email,password:hash})
                await user.save()
                res.send({message:"Registered Successfully",data:user})
            }
        })
    }catch(err) {
        res.send({ "err": "Registration Failed" })
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
                    res.send({user:userData,token:token})
                }else {
                    res.send("Invalid Credentials")
                }
            })
        }else {
            res.send({message:"User Doesn't Exist"})
        }
    }catch(err) {
        res.send({message:"Something went wrong"})
    }
}
module.exports  = {register,login}