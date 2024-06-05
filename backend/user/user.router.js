import { Router } from "express"
import { postRegisterUserCtrl, postVerifyEmailCtrl } from "./user.controller.js"

export const UserRouter = Router()
  .post("/register", postRegisterUserCtrl)
  .post("/verify-email", postVerifyEmailCtrl)
