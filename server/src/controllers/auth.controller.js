import { User } from "../models/user.js";
import { checkuser, getuser, getuserbyid, saveuser, userLogin } from "../services/user_services.js";
import {Apierror} from "../utils/Apierror.js";
import { generatetoken } from "../utils/jwt.js";

export const userSignup=async(req,res)=>{
    const{name,email,password} = req.body;
    try{
       if(!name){
          throw Apierror(400,"Field is required")
       }
       if(!email){
        throw Apierror(400,"Field is required")
       }
       if(!password){
        throw Apierror(400,"Field is required")
       }
       //check user already exists or not
       const check = await checkuser(email)
       if(check.status){
         throw Apierror(409,"User Already Exists")
       }
       //save the user details
       const savedata = await saveuser(req.body);
       if(savedata?.status){
          return res.status(201).json({message:"User created Successfully",status:true})
       }
       
    }catch(err){
       return res.status(err.statusCode || 500).json({
        message: err.message,status:false
    })
    }
}


export const userlogin = async(req,res)=>{
   const{email,password} = req.body;
  
   try{
       //check user credentials
       const checkcredentials = await userLogin(req.body);
       const {data} = checkcredentials;
       const{_id} = data;
       if(checkcredentials.status){
         const accesstoken= generatetoken(data);
         const userdata = {
            userid:_id,
            token:accesstoken
         }
          return res.status(200).json({message:"User login Succesfully",status:true,userdata})
       }
       else{
         return res.status(401).json({message:"Invalid Credentials",status:false})
       }
   }catch(err){
      console.log(err)
      return res.status(500).json({message:err.message})
   }
}

export const userprofile = async(req,res)=>{
   
   try{
      const userdetails = await getuserbyid(userid);
      if(userdetails.status){
         return res.status(200).json({message:"User Profile Fetched",data:userdetails?.data,status:true})
      }
      else{
         return res.status(404).json({message:"User not Found",status:false})
      }
       
   }catch(err){
      console.log(err);
      return 
   }
}