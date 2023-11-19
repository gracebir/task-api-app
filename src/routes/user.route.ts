import { Router } from "express";
import { register } from "../controllers/register";
import { signin } from "../middleware/authentication";

const router = Router()

router.post('/signup', register)

router.post('/signin', signin)

export default router