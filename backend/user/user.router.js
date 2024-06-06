import { Router } from "express"
import {
  getShowAllUsersCtrl,
  postLoginUserCtrl,
  postRegisterUserCtrl,
  postVerifyEmailCtrl,
} from "./user.controller.js"
import { doUserAuth } from "../middleware/doUserAuth.js"

export const UserRouter = Router()
  .post("/register", postRegisterUserCtrl)
  .post("/verify-email", postVerifyEmailCtrl)
  .post("/login", postLoginUserCtrl)
  .get("/all-users", doUserAuth, getShowAllUsersCtrl)
