import { Router } from "express"
import { postLoginUserCtrl, postRegisterUserCtrl, postVerifyEmailCtrl } from "./user.controller.js"

export const UserRouter = Router()
  .post("/register", postRegisterUserCtrl)
  .post("/verify-email", postVerifyEmailCtrl)
  .post("/login", postLoginUserCtrl)
