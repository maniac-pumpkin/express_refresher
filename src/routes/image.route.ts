import { Router } from "express"
import resolveToken from "../middleware/resolve-token.mw"
import { imageGet, imageUpload } from "../controllers/image.controller"

const route = Router()

route.post("/upload", resolveToken, imageUpload)
route.get("/", resolveToken, imageGet)

export default route
