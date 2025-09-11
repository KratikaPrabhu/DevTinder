const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const userschema = mongoose.Schema({
    firstName :{
        type:String,
        minLength:4,
        maxLength:50,
    },
    lastName :{
        type:String,
        // lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age :{
        type:Number,
        min:18
        
    },
    Password :{
        type:String,
    },
    gender :{
        type:String,
    },
    photoUrl:{
        type:String,
        default:"https://images.pexels.com/photos/3773478/pexels-photo-3773478.jpeg?cs=srgb&dl=pexels-israelzin-oliveira-3773478.jpg&fm=jpg",
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
    },
     changePassword:{
                
                type:mongoose.Schema.Types.ObjectId,
     }
},
{ 
    timestamps: true,
 }
)

userschema.methods.getJWT = function () {
    return jwt.sign({ _id: this._id }, "DevTinder$2629", { expiresIn: "7d" });
}

const userModel =mongoose.model("user",userschema);
module.exports={
     userModel,
}