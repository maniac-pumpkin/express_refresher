import { imageGet, imageUpload } from "@controllers/image.controller"
import resolveToken from "@middleware/resolve-token.mw"
import { Router } from "express"

const route = Router()

route.post("/upload", resolveToken, imageUpload)
route.get("/", resolveToken, imageGet)

export default route
