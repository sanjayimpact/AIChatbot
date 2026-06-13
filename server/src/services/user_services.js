import { User } from "../models/user.js";
import { Apierror } from "../utils/Apierror.js";
import { compare, hashpass } from "../utils/bcrypt.js";

export const checkuser = async(email)=>{
 
    const existing = await User.findOne({email:email})
       if(existing){
        return {status:true,user:existing._id}

       }
       else{
           
        return {status:false}

       }


}

export const getuser = async(email)=>{
    const userdetails = await User.findOne({email:email},{_id:0,password:0})
    if(userdetails){
        return {status:true,data:userdetails}
    }
    else{
        return{status:false,data:"null"}
    }
}

export const getuserbyid = async(id)=>{
    const userdetails = await User.findOne({_id:id},{_id:0,password:0})
    if(userdetails){
        return {status:true,data:userdetails}
    }
    else{
        return{status:false,data:"null"}
    }
}

export const saveuser = async(data)=>{
    const {name,password,email} = data;
   
    //generate hash
    const hashedpassword = await hashpass(password);
    const saveuser = new User({
        name:name,
        email:email,
        password:hashedpassword
    })
    await saveuser.save();
    return {status:true}
}

export const userLogin = async(data)=>{
    const {email,password} = data;
    
    try{
        const checkuser = await User.findOne({email:email})
      
        if(checkuser){
            const comparepass = await compare(password,checkuser.password)
            
            if(comparepass){
                return {status:true,data:checkuser}
            }
            else{
                return {status:false}
            }
        }
        else{
            return{status:false}
        }
         
    }catch(err){
       
        return {status:false}
    }
}