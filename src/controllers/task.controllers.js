import { createTaskService, getAllTasksservice } from "../services/task.services.js";
import Task from "../models/task.js";
import mongoose from "mongoose";
import task from "../models/task.js";

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
export const getAllTasks=async(req,res)=>{
    const user=req.user
    try{
        if(!user){
            return res.status(401).json({message:"user must first be logged in"})
        }
        const userTasks=await getAllTasksservice(user)
        return res.status(200).json(userTasks)
        
        
    }catch(error){
        return res.status(500).json({message:"internal server Error",error})
    }
}
export const updateTasks=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Task ID format!" });
          }

        const updatedTask=await Task.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!updatedTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json(updatedTask)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
   
    
}
export const deleteTask=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Task ID format!" });
          }
          const deletedTask=await task.findByIdAndDelete(id)
          if(!deletedTask){
            return res.status(404).json({message:"Task not found"})
          }
          res.status(200).json({message:"Task has deleted successfuly"});


    }catch(error){
        console.log(error)
        res.status(500).json({mesage:"internal server error"})
    }

}