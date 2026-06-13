import jwt from 'jsonwebtoken';



export const generatetoken = (data)=>{
    const{_id,email} = data;

    //generate a accessToken
    const accesstoken = jwt.sign({uid:_id,email:email},process.env.JWT_SECRET,{expiresIn:'5m'})
    return accesstoken

}