import { Router } from "express";
const router: Router = Router()

import * as controller from "../controllers/user.controller"
import * as validate from "../validates/user.validate"

router.post("/register", validate.register, controller.register)

export const userRoutes: Router = router