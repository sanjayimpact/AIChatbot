import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        const connectdb = await mongoose.connect(`${process.env.MONGO_URL}`)
        if(connectdb){
            console.log("Successfully Connected")
        }
        else{
            console.log("Something went wrong")
        }
    }catch(err){
        console.log(err);
    }
}