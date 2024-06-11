import { Router } from "express"
import { doUserAuth } from "../middleware/doUserAuth.js"
import {
  getOneUsersCtrl,
  getShowAllUsersCtrl,
  postLoginUserCtrl,
  postLogoutUserCtrl,
  postRegisterUserCtrl,
  postVerifyEmailCtrl,
} from "./user.controller.js"

export const UserRouter = Router()
  .post("/register", postRegisterUserCtrl)
  .post("/verify-email", postVerifyEmailCtrl)
  .post("/login", postLoginUserCtrl)
  .post("/logout", postLogoutUserCtrl)
  .get("/one-user", doUserAuth, getOneUsersCtrl)
  .get("/all-users", doUserAuth, getShowAllUsersCtrl)
