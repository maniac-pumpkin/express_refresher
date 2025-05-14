import { Router } from "express"
import { userSignin, userSignup, userVerify } from "../controllers/user.controller"

const route = Router()

route.post("/signup", userSignup)
route.post("/signin", userSignin)
route.get("/verify/:uuid", userVerify)

export default route
