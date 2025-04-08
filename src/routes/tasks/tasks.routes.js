import { Router } from "express";;
import { createTask } from "../../controllers/task.controllers.js";
import { protect } from "../../middleware/auth.js";


const routes=new Router();

routes.post("/create",protect,createTask)

export default routes;

