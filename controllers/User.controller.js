const jwt  = require("jsonwebtoken")
const {UserModel} =require("../models/User.model")
const bcrypt = require("bcrypt")
require("dotenv").config()

const register = async  (req,res) => {
    const { username,useremail, userpassword } = req.body
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
    const { username,usertype,useremail, userpassword } = req.body
    try{
        if(usertype == "admin"){
            if(useremail == "admin@gmail.com" && userpassword == "admin@123"){
                res.status(200).json({
                    status: "success",
                    data: { username,usertype,useremail, userpassword },
                    message: "Admin Login successful!",
                  });
            }else {
                res.status(401).json({
                    status: "error",
                    message: "Invalid credentials",
                  });
            }
          
        }else {
            const userData = await UserModel.findOne({useremail})
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
        }
    }catch(err) {
        res.status(500).json({
            status: "error",
            message: "Error occurred while fetching data",
          });
    }
}
const getUsers = async  (req,res) => {
    // console.log(username,useremail, userpassword )
    try{
        const usersData = await UserModel.find()
        // console.log("user => sjdflsdf",userData);
        if(usersData.length > 0){
            res.status(200).json({
                status: "success",
                users:usersData,
              });
        }else {
            res.status(401).json({
                status: "error",
                message: "Users don't exist",
              });
        }
    }catch(err) {
        res.status(500).json({
            status: "error",
            message: "Error occurred while fetching data",
          });
    }
}
const deleteUser = async  (req,res) => {
    const ID = req.params.id;
    try{
        const usersData = await UserModel.findByIdAndDelete({_id:ID})
        // res.send({id:ID,users:usersData})
        if (usersData) {
            const remainingUsers = await UserModel.find();
            if(remainingUsers.length > 0){
                res.status(200).json({
                    message: `Deleted the User whose id is ${ID}`,
                    users: remainingUsers,
                    remainingUserSize: remainingUsers.length,
                });
            }else{
                res.status(201).json({
                    message: `Deleted the User whose id is ${ID}`,
                    users: `You don't have any customer`,   
                });
            }
         
        } else {
            res.status(404).json({ message: `User with id ${ID} not found` });
        }
    }catch(err) {
        res.status(500).json({
            status: "error",
            message: "Error occurred while fetching data",
          });
    }
}

module.exports  = {register,login,getUsers,deleteUser}