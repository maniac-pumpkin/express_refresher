import { userSignin, userSignup, userVerify } from "@controllers/user.controller"
import resolveBody from "@middleware/resolve-body.mw"
import { Router } from "express"

const route = Router()

route.post("/signup", resolveBody, userSignup)
route.post("/signin", resolveBody, userSignin)
route.get("/verify/:uuid", userVerify)

export default route
