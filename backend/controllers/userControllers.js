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

const updateUserProfile = asyncHandler(
    async(req,res)=>{
       const user = await User.findById(req.user._id);

       if(user){
           user.name = req.body.name || user.name
           user.email = req.body.email || user.email
           user.pic = req.body.pic || user.pic

           if(req.body.password){
               user.password = req.body.password
           }
            const updatedUser = await user.save();

            res.json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                pic:updatedUser.pic,
                token:generateToken(updatedUser._id)           
           })
         }else{
             res.status(404);
             throw new Error("User not found");
         }        
    });


module.exports = {registerUser, loginUser, updateUserProfile};