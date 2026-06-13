import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        
    },
   
    isVerify:{
        type:Boolean,
        default:false
    }
})

export const User = mongoose.model("User",userSchema)