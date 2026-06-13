import express from "express"
import { userlogin, userSignup } from "../controllers/auth.controller.js"

export const userRouter = express.Router()
userRouter.post("/user/signup",userSignup)
userRouter.post("/user/login",userlogin)
