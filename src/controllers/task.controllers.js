import { createTaskService } from "../services/task.services.js";

export const createTask=async(req,res)=>{
    const user=req.user;
    try{
        if(!user){
            return res.status(500).json({message:"unauthorized user!"})
        }
        const {title,description}=req.body;
console.log("title=",title)
console.log("description=",description)
        if(!title || !description){
            return res.status(400).json({message:"please provide all field!"})
        }
        const taskData={
            title:title,
            description
        }
        const task=await createTaskService(user,taskData);
        return res.status(201).json({message:"task created successfully!",task})

    }catch(error){
        return res.status(500).json({message:"internal server error!",error});
    }
}