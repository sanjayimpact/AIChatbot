import bcrypt from "bcrypt"

const salt = 10;

export const hashpass = async(pass)=>{
   try{
     const hashedpassword = await bcrypt.hash(pass,salt)
  
     return hashedpassword
   }catch(err){
    console.log(err)
    throw new Error(`${err.message}`);
   }
   
}

export const compare = async(pass,hashpassword)=>{
    console.log(pass,hashpassword)
    try{
    const checkhash = await bcrypt.compare(pass,hashpassword)
   
    if(checkhash){
        return true
    }
    else{
        return false
    }
    }catch(err){
      throw new Error(`${err.message}`)
    }
   
}