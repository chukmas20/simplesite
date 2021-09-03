const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({

   name:{
       type:String,
       required:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true
},
isAdmin:{
    type:Boolean,
    default:false
},
pic:{
    type:String,
    required:true,
    default:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/071396/1.jpg?2974"
},

},{
    timestamps:true
}
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);