import { Router } from "express";
import authorization from "../middleware/authorization";
import { createTask, getAllTasks, updateTask } from "../controllers/task";

const router = Router()

router.post('/create/:userId', authorization, createTask)

router.get('/:taskId', authorization, getAllTasks)

router.put('/update:taskId', authorization, updateTask)

export default router