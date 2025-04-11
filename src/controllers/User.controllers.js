import User from "../models/User.js";
import mongoose from "mongoose";

const userUpdate=   async(req,res)=>{
try{
    const  {name,email}=req.body
    const id=req.params.id;
    const userExit=  await User.findOne({email:email})
    if(!userExit){
        return  res.status(400).json({message:"user is not exist!"})
    }
    const updatedUser= await User.findByIdAndUpdate(id,{
        name:name,
        email:email
    },{new:true}
)
res.status(200).json({message:"User updated successfully!",updatedUser})

}catch(error){
res.status(500).json({message:"internal server error",error});
}
}
export default userUpdate;