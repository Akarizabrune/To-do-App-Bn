import task from "../models/task.js";
import User from "../models/User.js";
import ApiError from "../utils/errorHandlers.js";




export const createTaskService=async(user,taskData)=>{
    const userData=await User.findById(user.id)
    const {title,description}=taskData;
    if(!userData){
        throw new ApiError(`user with id= ${user.id} not found`,404)
    }
    try{
        const newTask=await task.create({
            user:user.id,
            title,
            description
        })
        return newTask;
    }catch(error){
        throw new ApiError("error creating task",error)
    }

};
export const getAllTasksservice=async(user)=>{
    try{
        const userTaskData=await task.find({user:user.id})
        return userTaskData
    }catch(error){
        throw new ApiError("error fetching task",error)

    }
}