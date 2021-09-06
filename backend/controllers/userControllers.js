const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register
const registerUser = asyncHandler(
    async(req, res)=>{
        const{name, email, password, pic} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json("user already exists");
            //throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            pic,
            password
        })
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(400).json("An Error Occurred");
            //throw new Error("An Error Occurred");
        }   
     }
);

// Login
const loginUser = asyncHandler(
    async(req, res)=>{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(400).json("Invalid username or passsword");
            //throw new Error("Invalid username or passsword");
        }
     
     }
);



module.exports = {registerUser, loginUser};