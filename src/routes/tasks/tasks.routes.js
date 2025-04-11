import { Router } from "express";;
import { createTask, deleteTask, getAllTasks, updateTasks } from "../../controllers/task.controllers.js";
import { protect } from "../../middleware/auth.js";



const routes=new Router();

routes.post("/create",protect,createTask)
routes.get("/",protect,getAllTasks)
routes.put("/:id",updateTasks)
routes.delete("/tasks/:id",deleteTask)

export default routes;

