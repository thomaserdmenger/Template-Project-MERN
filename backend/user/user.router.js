import { Router } from "express"
import { postRegisterUserCtrl } from "./user.controller.js"

export const UserRouter = Router().post("/register", postRegisterUserCtrl)
